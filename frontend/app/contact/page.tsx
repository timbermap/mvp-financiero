import PageLayout from '@/components/PageLayout';

export default function ContactPage() {
  return (
    <PageLayout
      title="Get in Touch"
      subtitle="Have a question or feedback? We'd love to hear from you."
    >
      <div className="max-w-xl mx-auto">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
            <input type="text" id="name" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
            <input type="email" id="email" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
            <textarea id="message" rows={4} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"></textarea>
          </div>
          <div>
            <button type="submit" className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              Send Message
            </button>
          </div>
        </form>
        <p className="text-center mt-8 text-slate-500">
          You can also reach us directly at <a href="mailto:support@mvpfinanciero.com" className="font-medium text-teal-600 hover:underline">support@mvpfinanciero.com</a>.
        </p>
      </div>
    </PageLayout>
  );
}