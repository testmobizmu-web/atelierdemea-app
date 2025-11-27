export const metadata = {
  title: "Privacy Policy | Atelier de Méa",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-[#47201d]">
      <section className="max-w-3xl mx-auto px-4 py-10 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#a36d63] mb-6">
          This policy explains how Atelier de Méa collects, uses and protects
          your personal information.
        </p>

        <h2 className="text-lg font-semibold mb-2">1. Data we collect</h2>
        <p className="text-sm mb-3">
          When you contact us or place an order, we may collect:
        </p>
        <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
          <li>Your name and contact details (phone, email, address).</li>
          <li>Order details (products, size, colour, notes).</li>
          <li>
            Conversation history via WhatsApp, email or social networks related
            to your order.
          </li>
        </ul>

        <h2 className="text-lg font-semibold mb-2">2. How we use your data</h2>
        <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
          <li>To prepare, deliver and follow up your orders.</li>
          <li>To answer questions and provide customer support.</li>
          <li>To inform you about important updates to our services.</li>
        </ul>

        <h2 className="text-lg font-semibold mb-2">
          3. Storage &amp; security
        </h2>
        <p className="text-sm mb-4">
          We store your information securely and only for as long as necessary
          for legal and accounting purposes. Access to your data is limited to
          Atelier de Méa and service providers strictly involved in order
          processing (for example, delivery partners or payment services).
        </p>

        <h2 className="text-lg font-semibold mb-2">4. Sharing your data</h2>
        <p className="text-sm mb-4">
          We do <strong>not</strong> sell or rent your personal data. Your
          details may be shared only:
        </p>
        <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
          <li>With delivery partners to deliver your order.</li>
          <li>With payment providers to process your payment.</li>
          <li>If required by law or legal authorities.</li>
        </ul>

        <h2 className="text-lg font-semibold mb-2">5. Your rights</h2>
        <p className="text-sm mb-4">
          You may contact us at any time to:
        </p>
        <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
          <li>Request access to the personal data we hold about you.</li>
          <li>Ask for corrections if information is inaccurate.</li>
          <li>Request deletion where legally possible.</li>
        </ul>

        <p className="text-xs text-[#a36d63] mt-6">
          For any privacy questions, please contact us on WhatsApp
          (+230&nbsp;5911&nbsp;7549) or by email at auretho3e@gmail.com.
        </p>
      </section>
    </main>
  );
}
