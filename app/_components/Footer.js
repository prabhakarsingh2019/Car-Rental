function Footer() {
  return (
    <footer className="bg-brand-900 border-t border-brand-700 text-sm text-neutral-400">
      <div className="max-w-9xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <p>© {new Date().getFullYear()} LuxDrive. All rights reserved.</p>
        <p>Built with ❤️ using Next.js & Tailwind</p>
      </div>
    </footer>
  );
}

export default Footer;
