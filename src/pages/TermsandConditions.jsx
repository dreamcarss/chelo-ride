import { useEffect } from 'react';


const TermsAndConditions = () => {
  return (


        <div className="bg-black text-gray-800 leading-relaxed p-6 md:p-10 max-w-4xl mx-auto font-sans pt-20 pb-20 px-6 md:px-12 lg:px-24 py-8">
          
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            Terms and Conditions
          </h3>

          <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">
            <section>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Delay</h4>
              <p>
                1) A rental day is 24 hours. A late fee as mentioned in the above ENTRY FORM is applicable for vehicles returned late after the grace period of 1hr.
              </p>
            </section>

            <section>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Use of Vehicle</h4>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Beginner or inexperienced riders are not recommended to rent a vehicle.</li>
                <li>The customer should have a valid driving license, be at least 18 years old and must always wear a seatbelt while driving.</li>
                <li>In case an accident occurs during the customer's trip, the customer must provide FIR copy and spot photos to the concerned person in the company for the insurance procedure. If the claim is declined by the insurance, the customer must pay the repair and service charges including the loss of business claimed by the company. It must be cleared within 30 days; otherwise, the company will initiate legal proceedings.</li>
                <li>The customer shall use the vehicle entirely at his/her own risk and agrees that the company will not accept any responsibility or be held accountable for any loss, injury, or death resulting from the hire of any vehicle. In such cases, the customer must resolve all legal and non-legal issues before returning the vehicle.</li>
                <li>The car shall be returned to the company in the same condition as it was handed over.</li>
                <li>If the vehicle is returned excessively dirty or muddy, the customer will bear the washing charges.</li>
                <li>Rental package does not include Fuel, Toll, roadside assistance, or Taxes.</li>
                <li>Customer is responsible for any traffic violations incurred during the rental period. The company is not liable for any such costs.</li>
                <li>You must report such violations to a Company’s Representative as soon as possible.</li>
                <li>Towing service will be borne by the customer in case of tire puncture/blast, collision, or breakdown due to improper usage. In the event of technical failure, the customer is responsible for handing over the vehicle to our representative. (In such cases, the company will provide another car if possible; otherwise, the balance amount will be returned within 15 working days after inspection.)</li>
              </ol>
            </section>

            <section>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Prohibited Uses</h4>
              <p className="mb-2">The use of a Company’s vehicle under the following conditions is prohibited:</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Any format of professional or amateur competitions and media usage.</li>
                <li>By any person who is under the influence of (i) alcohol or (ii) any drug or medication that impairs driving ability.</li>
                <li>In carrying out any crime or illegal activity. <strong>(The customer must clear all legal issues and return the car; meanwhile, the business loss must be borne by the customer.)</strong></li>
              </ol>
            </section>

            <section>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Delivery Process</h4>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Customer must be present at the agreed date and time to pick up the car. Documents will be verified and returned.</li>
                <li>Delivered vehicle cannot be rejected after handover. Once accepted by the customer or representative, the vehicle cannot be returned before the agreed rental period. Customer should inspect the vehicle before leaving.</li>
                <li>Although we conduct quality checks, the customer is expected to report any damages to the company representative, and a video will be recorded.</li>
              </ol>
            </section>

            <section>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Handover Process</h4>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Pick-up and drop-off date/time will be mutually decided. Drop-off location will be the same as pick-up.</li>
                <li>Customer must be present at the agreed date and time.</li>
              </ol>
            </section>

            <section>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Damage Policy</h4>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>The customer agrees to pay for any damage, loss, or theft of vehicle parts, regardless of cause or fault. Items damaged beyond repair will be charged at showroom price.</li>
                <li>The representative will inspect the vehicle to determine damage:
                  <ul className="list-disc list-inside ml-5 mt-1">
                    <li>a) Pre-existing damage agreed upon will not be chargeable.</li>
                    <li>b) Tear in seat cover will incur replacement charges. Opening a stitched joint is not chargeable.</li>
                  </ul>
                </li>
                <li>Any damage not due to normal wear and tear will be charged to the customer.</li>
                <li>In case of an accident, towing or confiscation costs are borne solely by the customer.</li>
                <li>Inactive hours during repair will be charged at 100% of the daily rental amount.</li>
              </ol>
            </section>

            <section>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Fuel Policy</h4>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Fuel is the customer’s responsibility. We provide enough fuel to reach the nearest pump.</li>
                <li>Fuel reimbursement is not allowed.</li>
              </ol>
            </section>

            <section>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Process</h4>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Chelo Ride may send booking confirmations, itinerary info, cancellations, payment confirmations, refunds, or schedule changes via SMS, call, or email.</li>
                <li>We may contact you to assist with booking completion or understand your preferences.</li>
              </ol>
            </section>

            <section>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Maintenance</h4>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Customer is responsible for checking engine oil and maintaining the vehicle during the trip. Report mechanical failures immediately.</li>
                <li>Customer may be held liable for mechanical failure due to negligence in routine maintenance.</li>
              </ol>
            </section>

            <section>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Cancellation Policy</h4>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>No show: 100% deduction; only security deposit refunded.</li>
                <li>0–6 hrs before pickup: 75% rental charges withheld; deposit refunded.</li>
                <li>6–24 hrs before pickup: 50% rental charges withheld.</li>
                <li>24–72 hrs before pickup: 25% rental charges withheld.</li>
                <li>72+ hrs before pickup: 10% rental charges withheld.</li>
              </ol>
            </section>

            <section>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Security Deposit</h4>
              <p>1) The customer must deposit a refundable caution amount, if applicable.</p>
            </section>

            <section>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Over Speeding</h4>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Vehicles must be driven within permissible limits.</li>
                <li>You must adhere to the lower of the company's speed limit or the government's speed limit.</li>
              </ol>
            </section>

            <section>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Use of Information</h4>
              <p>1) The user's first name and booking details may be used to show booking popups to other users on our homepage. No other personal information will be displayed.</p>
            </section>

            <div className="mt-8 p-5 bg-gray-100 border-l-4 border-blue-500 rounded text-sm italic text-gray-800">
              <strong>BY AGREEING TO THIS RELEASE,</strong> THE RIDER CERTIFIES THAT HE/SHE HAS READ THIS RELEASE AND FULLY UNDERSTANDS IT, IS NOT RELYING ON ANY STATEMENTS OR REPRESENTATIONS FROM THE COMPANY, AND HAS BEEN GIVEN SUFFICIENT TIME TO ASK QUESTIONS.
            </div>
          </div>
        </div>

     
  );
};

export default TermsAndConditions;