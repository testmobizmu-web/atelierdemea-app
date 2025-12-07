// src/app/policies/privacy/page.tsx
export default function PrivacyPolicyPage() {
  return (
    <>
      <p className="text-[11px] uppercase tracking-[0.2em] text-[#e11d70] mb-2">
        Policies
      </p>
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
        Privacy Policy
      </h1>
      <p className="text-sm sm:text-base text-[#a36d63] mb-6">
        How we collect, use and protect your personal information.
      </p>

      <div className="space-y-4 text-sm sm:text-base leading-relaxed">
        <p>
          We only collect the information necessary to process your order and
          provide customer support: name, delivery address, phone number,
          email address and order details.
        </p>
        <p>
          Your data is used to prepare and deliver your parcel, send order
          confirmations and, if you agree, occasional updates about new
          collections or promotions.
        </p>
        <p>
          We never sell your personal data to third parties. Service providers
          involved in payment and delivery only receive the minimum information
          required to complete their task.
        </p>
        <p>
          If you would like to access, correct or delete your personal data,
          please contact us at{" "}
          <a
            href="mailto:aureth03@gmail.com"
            className="text-[#e11d70] underline"
          >
            aureth03@gmail.com
          </a>
          .
        </p>
      </div>
    </>
  );
}
