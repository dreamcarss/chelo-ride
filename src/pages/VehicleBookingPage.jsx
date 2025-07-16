import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ArrowRight,
  CreditCard,
  Shield,
  AlertCircle,
  FileText,
  CheckCircle,
  Upload,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import supabase from "../lib/supabase";
import LoginModal from "../components/LoginModal";
import { useNavigate, useParams } from "react-router-dom";

const VehicleBookingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vehicle, setVehicle] = useState(null);
  const [bookingData, setBookingData] = useState({});
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [id, setId] = useState();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitLater, setSubmitLater] = useState(false);

  // Document States
  const [aadhaarFront, setAadhaarFront] = useState(null);
  const [aadhaarBack, setAadhaarBack] = useState(null);
  const [drivingLicenseFront, setDrivingLicenseFront] = useState(null);
  const [drivingLicenseBack, setDrivingLicenseBack] = useState(null);
  const [workProofFile, setWorkProofFile] = useState(null);



  const [termsAccepted, setTermsAccepted] = useState(false);
  const { id: carId } = useParams();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        navigate('/login');
        return;
      }
      setUser(user);
    };

    const loadCarId = localStorage.getItem("carId") || carId;
    setId(loadCarId);
    checkAuthStatus();
    fetchVehicle(loadCarId);
    loadBookingData();
    loadRazorpay();
  }, [carId, navigate]);

  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'; 
    script.async = true;
    document.body.appendChild(script);
  };

  const fetchVehicle = async (id) => {
    try {
      const { data, error } = await supabase.from("cars").select("*").eq("id", id).single();
      if (error) throw error;
      setVehicle(data);
    } catch (error) {
      console.error("Error fetching vehicle:", error.message);
      toast({ title: "Error", description: "Failed to load vehicle details.", variant: "destructive" });
    }
  };

  const loadBookingData = () => {
    const storedData = localStorage.getItem("carRentalFormData");
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    } else {
      navigate(`/vehicle/${id}`);
    }
  };

  const calculateTotalHours = () => {
    if (!bookingData.pickupDate || !bookingData.pickupTime || !bookingData.returnDate || !bookingData.returnTime)
      return 0;

    const pickupDateTime = new Date(`${bookingData.pickupDate} ${bookingData.pickupTime}`);
    const returnDateTime = new Date(`${bookingData.returnDate} ${bookingData.returnTime}`);

    const timeDifferenceInMs = returnDateTime - pickupDateTime;
    const totalHours = timeDifferenceInMs / (1000 * 60 * 60);
    return Math.max(1, Math.round(totalHours));
  };

  const calculateSubtotal = () => (vehicle ? vehicle.price * calculateTotalHours() : 0);
  const calculateTax = () => calculateSubtotal() * 0.18;
  const calculateTotal = () => calculateSubtotal() + calculateTax();

  // Validate Step 1
const validateStep1 = () => {
  const missingDocs = [];

  if (!aadhaarFront || !aadhaarBack) {
    missingDocs.push("Aadhaar Card");
  }

  if (!drivingLicenseFront || !drivingLicenseBack) {
    missingDocs.push("Driving License");
  }

  if (!workProofFile) {
    missingDocs.push("Work Proof");
  }

  if (missingDocs.length > 0) {
    toast({
      title: "Documents Missing",
      description: `Please remember to bring ${missingDocs.join(", ")} at pickup.`,
      variant: "default",
      duration: 6000,
    });
  }


  return true;
};

  const handleStep1Next = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      toast({
        title: "Documents submited",
        description: "Proceeding to payment.",
        variant: "success"
      });
    }
  };
const handleDocumentUpload = (setter, e) => {
  const file = e.target.files[0];
  if (!file) return;

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(file.type)) {
    toast({ title: "Invalid File", description: "Only JPG, PNG or PDF files allowed." });
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    toast({ title: "File Too Large", description: "Max size is 5MB" });
    return;
  }
  console.log(file)
  setter(file); // Set full file object — we'll use .name in JSX
};

  const sendSMS = async (to, body) => {
    const accountSid = process.env.REACT_APP_Account_SID;
    const authToken = process.env.REACT_APP_Auth_Token;
    const messagingServiceSid = process.env.REACT_APP_Messaging_Service_SID;
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`; 

    const formData = new FormData();
    formData.append('To', to);
    formData.append('MessagingServiceSid', messagingServiceSid);
    formData.append('Body', body);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(accountSid + ':' + authToken)
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('SMS sent:', result.sid);
      return result;
    } catch (error) {
      console.error('SMS failed:', error);
      throw error;
    }
  };

  const displayRazorpay = async () => {
    try {
      const amountInPaise = Math.round(calculateTotal() * 100);
      const options = {
        key: 'rzp_test_T8qwI5HfUqYUsn',
        amount: amountInPaise.toString(),
        currency: 'INR',
        name: 'CheloRide',
        description: `Vehicle Rental: ${vehicle.name}`,
        handler: function(response) {
          handlePaymentSuccess(response);
        },
        prefill: {
          name: user?.user_metadata?.full_name || '',
          email: user?.email || '',
          contact: user?.user_metadata?.phone_number || ''
        },
        notes: {
          vehicle_id: vehicle.id,
          pickup_date: bookingData.pickupDate,
          return_date: bookingData.returnDate
        },
        theme: {
          color: '#FFCC00'
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function(response) {
        toast({
          title: "Payment Failed",
          description: "The payment process was unsuccessful. Please try again.",
          variant: "destructive",
        });
      });
      rzp.open();
    } catch (error) {
      console.error("Razorpay error:", error);
      toast({
        title: "Payment Error",
        description: "There was an error initiating the payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePaymentSuccess = async (paymentResponse) => {
    setIsLoading(true);
    try {
      let aadhaarFrontUrl = null;
      let aadhaarBackUrl = null;
      let drivingLicenseFrontUrl = null;
      let drivingLicenseBackUrl = null;
      let workProofUrl = null;

      // Upload Aadhaar Front
      if (aadhaarFront) {
        console.log("Uploading Aadhaar Front:", aadhaarFront.name);
        const frontFileExt = aadhaarFront.name.split('.').pop();
        const frontFilePath = `documents/${user.id}/${Date.now()}_aadhaar_front.${frontFileExt}`;
        const { error: frontError } = await supabase.storage.from('documents').upload(frontFilePath, aadhaarFront);
        if (frontError) throw frontError;
        const { data  } = supabase.storage.from('documents').getPublicUrl(frontFilePath);
        aadhaarFrontUrl = data.publicUrl;
      }

      // Upload Aadhaar Back
      if (aadhaarBack) {
        const backFileExt = aadhaarBack.name.split('.').pop();
        const backFilePath = `documents/${user.id}/${Date.now()}_aadhaar_back.${backFileExt}`;
        const { error: backError } = await supabase.storage.from('documents').upload(backFilePath, aadhaarBack);
        if (backError) throw backError;
        const { data } = supabase.storage.from('documents').getPublicUrl(backFilePath);
        aadhaarBackUrl = data.publicUrl;
      }

      // Upload Driving License Front
      if (drivingLicenseFront) {
        const frontFileExt = drivingLicenseFront.name.split('.').pop();
        const frontFilePath = `documents/${user.id}/${Date.now()}_dl_front.${frontFileExt}`;
        const { error: frontError } = await supabase.storage.from('documents').upload(frontFilePath, drivingLicenseFront);
        if (frontError) throw frontError;
        const { data } = supabase.storage.from('documents').getPublicUrl(frontFilePath);
        drivingLicenseFrontUrl = data.publicUrl;
      }

      // Upload Driving License Back
      if (drivingLicenseBack) {
        const backFileExt = drivingLicenseBack.name.split('.').pop();
        const backFilePath = `documents/${user.id}/${Date.now()}_dl_back.${backFileExt}`;
        const { error: backError } = await supabase.storage.from('documents').upload(backFilePath, drivingLicenseBack);
        if (backError) throw backError;
        const { data } = supabase.storage.from('documents').getPublicUrl(backFilePath);
        drivingLicenseBackUrl = data.publicUrl;
      }

      // Upload Work Proof
      if (workProofFile) {
        const wpFileExt = workProofFile.name.split('.').pop();
        const wpFilePath = `documents/${user.id}/${Date.now()}_workproof.${wpFileExt}`;
        const { error: wpError } = await supabase.storage.from('documents').upload(wpFilePath, workProofFile);
        if (wpError) throw wpError;
        const { data } = supabase.storage.from('documents').getPublicUrl(wpFilePath);
        workProofUrl = data.publicUrl;
      }

      const bookingDataToInsert = {
        user: user.id,
        user_phone: user.user_metadata.phone_number,
        user_name: user.user_metadata.full_name,
        car_id: vehicle.id,
        city: bookingData.city,
        location: bookingData.location,
        pickup_date: bookingData.pickupDate,
        pickup_time: bookingData.pickupTime,
        return_date: bookingData.returnDate,
        return_time: bookingData.returnTime,
        totalAmount: calculateTotal(),
        status: "pending",
        aadhaar_front_url: aadhaarFrontUrl,
        aadhaar_back_url: aadhaarBackUrl,
        dl_front_url: drivingLicenseFrontUrl,
        dl_back_url: drivingLicenseBackUrl,
        work_proof_url: workProofUrl,
        payment_id: paymentResponse?.razorpay_payment_id || null,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("bookings").insert([bookingDataToInsert]);
        if (error) throw error;

      // Send SMS notifications
      try {
        // await sendSMS('+918520800787', 'Your booking confirmed');
        // await sendSMS('+919070147866', 'New booking confirmed');
      } catch (smsError) {
        console.error('SMS sending failed:', smsError);
      }

      toast({
        title: "Booking Successful",
        description: "Your vehicle has been booked successfully and documents uploaded!",
        variant: "success",
      });

      localStorage.removeItem("carRentalFormData");
      setTimeout(() => navigate("/profile"), 2000);
    } catch (error) {
      console.error("Error during booking:", error);
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    if (!termsAccepted) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }
    handlePaymentSuccess();
  };

  if (!vehicle || Object.keys(bookingData).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-black pt-20 min-h-screen">
      {/* Progress Indicator */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center ${currentStep >= 1 ? 'text-yellow-400' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-yellow-400 text-gray-900' : 'bg-gray-600 text-white'}`}>
              {currentStep > 1 ? <CheckCircle size={20} /> : '1'}
            </div>
            <span className="ml-2 font-medium">Document Upload</span>
          </div>
          <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-yellow-400' : 'bg-gray-600'}`}></div>
          <div className={`flex items-center ${currentStep >= 2 ? 'text-yellow-400' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-yellow-400 text-gray-900' : 'bg-gray-600 text-white'}`}>
              2
            </div>
            <span className="ml-2 font-medium">Payment</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-20">
        {/* Step 1: Document Upload */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="text-yellow-400" />
                Document Verification
              </h2>

              {/* Aadhaar Upload */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-300 mb-2">Aadhaar Card</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Front Side</label>
                    <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-all ${aadhaarFront ? 'border-green-500 bg-green-500/5' : 'border-gray-600 hover:border-gray-500'}`}>
                      <input type="file" accept="image/*,.pdf" onChange={(e) => handleDocumentUpload(setAadhaarFront, e)} className="hidden" id="aadhaarFront" />
                      <label htmlFor="aadhaarFront" className="cursor-pointer">
                        {aadhaarFront ? (
  <div className="flex flex-col items-center">
    <CheckCircle className="mx-auto text-green-400 mb-2" size={28} />
    <p className="text-green-400 text-sm">{aadhaarFront.name}</p>
  </div>
) : (
  <>
    <Upload className="mx-auto text-gray-400 mb-2" size={28} />
    <p className="text-gray-300 text-sm">Click to upload</p>
  </>
)}
                      </label>
                      {/* {aadhaarFrontPreview && <img src={aadhaarFrontPreview} alt="Aadhaar Front Preview" className="mt-2 max-h-32 mx-auto rounded" />} */}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Back Side</label>
                    <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-all ${aadhaarBack ? 'border-green-500 bg-green-500/5' : 'border-gray-600 hover:border-gray-500'}`}>
                      <input type="file" accept="image/*,.pdf" onChange={(e) => handleDocumentUpload(setAadhaarBack, e)} className="hidden" id="aadhaarBack" />
                      <label htmlFor="aadhaarBack" className="cursor-pointer">
                        {aadhaarBack ? (
                          <div className="flex flex-col items-center">
                            <CheckCircle className="mx-auto text-green-400 mb-2" size={28} />
                            <p className="text-green-400 text-sm">{aadhaarBack.name}</p>
                          </div>
                        ) : (
                          <>
                            <Upload className="mx-auto text-gray-400 mb-2" size={28} />
                            <p className="text-gray-300 text-sm">Click to upload</p>
                          </>
                        )}
                      </label>
                      {/* {aadhaarBackPreview && <img src={aadhaarBackPreview} alt="Aadhaar Back Preview" className="mt-2 max-h-32 mx-auto rounded" />} */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Driving License Upload */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-300 mb-2">Driving License</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Front Side</label>
                    <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-all ${drivingLicenseFront ? 'border-green-500 bg-green-500/5' : 'border-gray-600 hover:border-gray-500'}`}>
                      <input type="file" accept="image/*,.pdf" onChange={(e) => handleDocumentUpload(setDrivingLicenseFront, e)} className="hidden" id="dlFront" />
                      <label htmlFor="dlFront" className="cursor-pointer">
                        {drivingLicenseFront ? (
                          <div className="flex flex-col items-center">
                            <CheckCircle className="mx-auto text-green-400 mb-2" size={28} />
                            <p className="text-green-400 text-sm">{drivingLicenseFront.name}</p>
                          </div>
                        ) : (
                          <>
                            <Upload className="mx-auto text-gray-400 mb-2" size={28} />
                            <p className="text-gray-300 text-sm">Click to upload</p>
                          </>
                        )}
                      </label>
                      {/* {drivingLicenseFrontPreview && <img src={drivingLicenseFrontPreview} alt="DL Front Preview" className="mt-2 max-h-32 mx-auto rounded" />} */}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Back Side</label>
                    <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-all ${drivingLicenseBack ? 'border-green-500 bg-green-500/5' : 'border-gray-600 hover:border-gray-500'}`}>
                      <input type="file" accept="image/*,.pdf" onChange={(e) => handleDocumentUpload(setDrivingLicenseBack, e)} className="hidden" id="dlBack" />
                      <label htmlFor="dlBack" className="cursor-pointer">
                        {drivingLicenseBack ? (
                          <div className="flex flex-col items-center">
                            <CheckCircle className="mx-auto text-green-400 mb-2" size={28} />
                            <p className="text-green-400 text-sm">{drivingLicenseBack.name}</p>
                          </div>
                        ) : (
                          <>
                            <Upload className="mx-auto text-gray-400 mb-2" size={28} />
                            <p className="text-gray-300 text-sm">Click to upload</p>
                          </>
                        )}
                      </label>
                      {/* {drivingLicenseBackPreview && <img src={drivingLicenseBackPreview} alt="DL Back Preview" className="mt-2 max-h-32 mx-auto rounded" />} */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Work Proof Upload */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-300 mb-2">Work Proof</h3>
                <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-all ${workProofFile ? 'border-green-500 bg-green-500/5' : 'border-gray-600 hover:border-gray-500'}`}>
                  <input type="file" accept="image/*,.pdf" onChange={(e) => handleDocumentUpload(setWorkProofFile, e)} className="hidden" id="workProof" />
                  <label htmlFor="workProof" className="cursor-pointer">
                    {workProofFile ? (
                      <div className="flex flex-col items-center">
                        <CheckCircle className="mx-auto text-green-400 mb-2" size={28} />
                        <p className="text-green-400 text-sm">{workProofFile.name}</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto text-gray-400 mb-2" size={28} />
                        <p className="text-gray-300 text-sm">Click to upload work proof</p>
                      </>
                    )}
                  </label>
                  {/* {workProofPreview && <img src={workProofPreview} alt="Work Proof Preview" className="mt-2 max-h-32 mx-auto rounded" />} */}
                </div>
              </div>

          

         <div className="flex flex-col space-y-4">
  <Button
    onClick={handleStep1Next}
    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3"
  >
    Verify Documents & Continue
    <ArrowRight className="ml-2" size={20} />
  </Button>

  <Button
    onClick={() => {
      setCurrentStep(2); // Skip document upload
      setSubmitLater(true); // Set flag to indicate submission later
    }}
    variant="outline"
    className="w-full border-gray-600 hover:bg-gray-700 text-gray-300"
  >
    Submit Later
  </Button>
</div>
            </div>

            {/* Booking Summary */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-4">Booking Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-300">
                  <span>Pickup Date & Time</span>
                  <span>{bookingData.pickupDate} at {bookingData.pickupTime}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Return Date & Time</span>
                  <span>{bookingData.returnDate} at {bookingData.returnTime}</span>
                </div>
                <hr className="border-gray-600" />
                <div className="flex justify-between text-gray-300">
                  <span>Total Hours</span>
                  <span>{calculateTotalHours()} hours</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Price per Hour</span>
                  <span>Rs {vehicle.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>Rs {calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax (18%)</span>
                  <span>Rs {calculateTax().toFixed(2)}</span>
                </div>
                <hr className="border-gray-600" />
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total Amount</span>
                  <span>Rs {calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Payment */}
        {currentStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Summary */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Booking Summary</h2>
                <Button
                  onClick={() => setCurrentStep(1)}
                  variant="outline"
                  size="sm"
                  className="text-gray-300 border-gray-600 hover:bg-gray-700"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Back
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-300">
                  <span>Pickup Date & Time</span>
                  <span>{bookingData.pickupDate} at {bookingData.pickupTime}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Return Date & Time</span>
                  <span>{bookingData.returnDate} at {bookingData.returnTime}</span>
                </div>
                <hr className="border-gray-600" />
                <div className="flex justify-between text-gray-300">
                  <span>Total Hours</span>
                  <span>{calculateTotalHours()} hours</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Price per Hour</span>
                  <span>Rs {vehicle.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>Rs {calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax (18%)</span>
                  <span>Rs {calculateTax().toFixed(2)}</span>
                </div>
                <hr className="border-gray-600" />
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total Amount</span>
                  <span>Rs {calculateTotal().toFixed(2)}</span>
                </div>

                    {/* Terms and Conditions */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 text-yellow-400 focus:ring-yellow-400"
                  />
                  <label htmlFor="terms" className="text-gray-300 text-sm">
                    I agree to the <a href="/conditions" className="text-yellow-400 hover:underline">Terms & Conditions</a>
                  </label>
                </div>
              </div>

              <div>
                <p>
               Please bring the following documents in both Xerox (photocopy) and original hardcopy format at the time of pickup:
<br />
Aadhaar Card (Front and Back)
<br />
Driving License (Front and Back)
<br />
Proof of Work
                </p>
              </div>
                <Button
                  onClick={handleBookNow}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Pay Now "}
                  <CreditCard className="ml-2" size={20} />
                </Button>
              </div>
            </div>
            {/* Payment Information */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-white mb-4">Payment Information</h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start gap-3">
                  <CreditCard className="text-yellow-400 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-white">Secure Payment</p>
                    <p>Pay securely using Razorpay. We accept Credit/Debit cards, UPI, NetBanking, and Wallets.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="text-yellow-400 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-white">Safe & Secure</p>
                    <p>Your payment information is processed securely. We do not store credit card details.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-yellow-400 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-white">Cancellation Policy</p>
                    <p>Free cancellation up to 24 hours before pickup. Cancellations within 24 hours will be charged 50% of the booking amount.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </main>
      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} CheloRide. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default VehicleBookingPage;