import React from 'react';

const Conditions = () => {
  return (
    <div className="min-h-screen bg-luxe-black text-white pt-20 pb-20 px-6 md:px-12 lg:px-24 py-8 ">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Terms & Conditions</h1>

      <section className="space-y-6 ">
        {/* Delay Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Delay</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>A rental day is 24 hours. A late fee as mentioned in the above ENTRY FORM is applicable for vehicles returned late.</li>
          </ul>
        </div>

        {/* Use of Vehicle */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Use of Vehicle</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Beginner or inexperienced riders are not recommended to rent a vehicle.</li>
            <li>The driver should have a valid driving license, be at least 18 years old and must always wear a seatbelt while driving.</li>
            <li>In case a major accident occurs during the customer’s trip, the customer must provide FIR copy and spot photos to the company for insurance procedures. The customer is responsible for damage repair charges in accident cases if:
              <ul className="list-circle pl-5 mt-1 space-y-1">
                <li>The person drives the vehicle without a valid driving license</li>
                <li>Drunk and drive</li>
                <li>Influenced by drugs</li>
              </ul>
            </li>
            <li>If the customer does not provide the documents, then the customer is responsible to pay for all vehicle damage charges, loss of business, quotation given by the company, and third-party claims.</li>
            <li>In case the claim is declined by the insurance, the customer must pay the repair and service charges including the loss of business claimed by the company. It must be cleared within 30 days; otherwise, legal proceedings will begin.</li>
            <li>The customer shall use the vehicle entirely at his/her own risk and agrees that the company will not accept any responsibility or be held accountable for any loss, injury, or death resulting from the hire of any vehicle.</li>
            <li>The car shall be returned back to the company in the same condition it was handed over to the customer.</li>
            <li>If the vehicle returned is found excessively dirty/muddy, the customer will bear the charge of washing.</li>
            <li>Rental package does not include Fuel, Toll, roadside assistance, and Taxes.</li>
            <li>Customer is responsible for any traffic violations incurred due to their use of a rented vehicle. The company is not liable for any such costs.</li>
            <li>You must report such violations to a Company’s Representative as soon as possible.</li>
            <li>Towing service will be borne by the customer in case of tire puncture/blast, collision, or breakdown due to improper usage. In the event of technical failure, the customer is responsible to hand over the vehicle to the company. If possible, another car will be provided, otherwise a refund will be processed within 15 working days after inspection.</li>
          </ul>
        </div>

        {/* Prohibited Uses */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Prohibited Uses</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Any format of professional or amateur competitions and media usage.</li>
            <li>By any person who is under the influence of alcohol or any drug or medication under the effects of which the operation of a vehicle is prohibited or not recommended.</li>
            <li>In carrying out of any crime or illegal activity. The customer must clear all legal issues before handing over the car and bear the business loss.</li>
          </ul>
        </div>

        {/* Delivery Process */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Delivery Process</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Customer has to be present at the agreed date and time to pick up the car. Documents must be carried and verified upon pickup.</li>
            <li>Delivered vehicle cannot be rejected after handover. Once accepted by Customer or representative, the vehicle cannot be returned before the agreed rental period.</li>
            <li>Though we do quality checks before delivery, the customer is expected to inspect the vehicle for damages and report them immediately. A video may be captured for verification.</li>
          </ul>
        </div>

        {/* Handover Process */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Handover Process</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Pick-up date and time will be mutually decided. Drop-off location will be the same as the pick-up location.</li>
            <li>Customer must be present at the agreed date and time.</li>
          </ul>
        </div>

        {/* Damage Policy */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Damage Policy</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>The customer agrees to pay for any damage, loss, or theft of parts of the vehicle, regardless of cause or fault.</li>
            <li>Items damaged beyond repair will be charged at showroom price.</li>
            <li>Damages not caused by normal wear and tear will be charged to the customer.</li>
            <li>In case of an accident, towing or confiscation costs are solely borne by the customer.</li>
            <li>Inactive hours during repair will be charged at 100% of the daily rental amount.</li>
          </ul>
        </div>

        {/* Fuel Policy */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Fuel Policy</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Fuel is the client’s responsibility. We provide sufficient fuel to reach the nearest pump.</li>
            <li>Replacement of fuel with money is not allowed.</li>
          </ul>
        </div>

        {/* FastTag */}
        <div>
          <h2 className="text-xl font-semibold mb-2">FastTag</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Fastag recharge is the client’s responsibility. We are not responsible for pending transactions or excess balances.</li>
          </ul>
        </div>

        {/* Security Deposit */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Security Deposit</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>The customer has to deposit refundable caution money to take a ride.</li>
            <li>Zero Security Deposit policy: Customer must submit a cheque or promissory note and collect it upon returning the car without damage.</li>
          </ul>
        </div>

        {/* Over Speeding */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Over Speeding</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Vehicles must be driven within permissible speed limits—whichever is lower between company rules or governing authorities.</li>
          </ul>
        </div>

        {/* Use of Information */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Use of Information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>User first name and booking details may appear in popups on our homepage. No other personal information will be shown.</li>
          </ul>
        </div>

        {/* Final Disclaimer */}
        <div className="mt-8 border-t border-gray-700 pt-4">
          <p className="italic">
            BY AGREEING TO THIS RELEASE, THE RIDER CERTIFIES THAT HE/SHE HAS READ THIS RELEASE AND FULLY UNDERSTANDS IT AND IS NOT RELYING ON ANY STATEMENTS OR REPRESENTATIONS OF ANY OF THE RELEASED PARTIES, AND HAS BEEN GIVEN THE OPPORTUNITY AND SUFFICIENT TIME TO READ AND ASK QUESTIONS REGARDING THIS RELEASE.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Conditions;