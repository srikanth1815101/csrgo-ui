/**
 * CSRGO UI Web Components
 * This file defines <csrgo-header> and <csrgo-footer> for seamless injection into any project.
 */

class CsrgoHeader extends HTMLElement {
    connectedCallback() {
        const logoUrl = this.getAttribute('logo-url') || 'dist/logo.png';
        const brandName = this.getAttribute('brand-name') || 'CSRGO';
        const currentPath = window.location.pathname;

        const links = [
            { name: 'Home', url: '/' },
            { name: 'Tools', url: '/tools/' },
            { name: 'Blog', url: '/blog/' },
            { name: 'Services', url: '/services/' },
            { name: 'DSA', url: '/dsa/' }
        ];

        let desktopLinksHtml = links.map(link => {
            const isActive = currentPath === link.url;
            const activeClass = isActive ? 'font-bold text-blue-600 dark:text-fuchsia-400' : 'text-gray-700 dark:text-gray-200';
            const underlineScale = isActive ? 'scale-x-100' : 'scale-x-0';
            return `
                <a href="${link.url}" class="relative py-2 px-2 transition hover:text-blue-600 dark:hover:text-fuchsia-400 ${activeClass}">
                    ${link.name}
                    <span class="absolute left-0 -bottom-1 w-full h-0.5 rounded bg-gradient-to-r from-blue-600 via-fuchsia-500 to-pink-500 transition-all duration-300 ${underlineScale} origin-left hover:scale-x-100"></span>
                </a>
            `;
        }).join('');

        let mobileLinksHtml = links.map(link => {
            const isActive = currentPath === link.url;
            const activeClass = isActive ? 'bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 text-purple-700 dark:text-purple-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50';
            return `
                <a href="${link.url}" class="block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeClass}">
                    <span>${link.name}</span>
                </a>
            `;
        }).join('');

        this.innerHTML = `
            <header class="fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-50 transition-all duration-300">
                <div class="max-w-7xl mx-auto">
                    <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-600/50 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg shadow-purple-500/10 dark:shadow-purple-400/10 relative">
                        <div class="flex justify-between items-center">
                            <!-- Logo and Site Title -->
                            <div class="flex items-center space-x-2 sm:space-x-3">
                                <a href="/" class="flex items-center">
                                    <div class="relative flex items-center justify-center p-1">
                                        <img src="${logoUrl}" alt="${brandName}" class="w-6 h-6 sm:w-8 sm:h-8 relative z-10" />
                                    </div>
                                    <div class="h-4 sm:h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1.5 sm:mx-2 self-center"></div>
                                    <div class="h-6 sm:h-8 flex items-center">
                                        <span class="text-xl sm:text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 leading-none pt-0.5">
                                            ${brandName}
                                        </span>
                                    </div>
                                </a>
                            </div>

                            <!-- Right Side -->
                            <div class="flex items-center space-x-4 sm:space-x-6">
                                <div class="hidden md:flex gap-8 text-base font-medium">
                                    ${desktopLinksHtml}
                                </div>
                                <div class="flex items-center space-x-1 sm:space-x-2">
                                    <button id="theme-toggle-btn" class="p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-fuchsia-400 transition-colors duration-200" aria-label="Toggle theme">
                                        <i id="theme-icon" data-lucide="sun" stroke-width="2" class="w-6 h-6"></i>
                                    </button>
                                    <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-fuchsia-400 transition-colors duration-200" aria-label="Toggle menu">
                                        <i data-lucide="menu" stroke-width="2" class="w-6 h-6"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Mobile Menu -->
                        <div id="mobile-menu" class="hidden md:hidden pt-4 mt-2 border-t border-gray-200/50 dark:border-gray-700/50 space-y-2">
                            ${mobileLinksHtml}
                        </div>
                    </div>
                </div>
            </header>
        `;

        this.setupInteractions();
    }

    setupInteractions() {
        const themeBtn = this.querySelector('#theme-toggle-btn');
        const menuBtn = this.querySelector('#mobile-menu-btn');
        const mobileMenu = this.querySelector('#mobile-menu');

        themeBtn.addEventListener('click', () => {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            if (newTheme === 'dark') html.classList.add('dark');
            else html.classList.remove('dark');
            
            const themeIcon = this.querySelector('#theme-icon');
            if (themeIcon) {
                themeIcon.setAttribute('data-lucide', newTheme === 'dark' ? 'sun' : 'moon');
                if (window.lucide) lucide.createIcons();
            }
        });

        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Initialize Theme Icon
        const currentTheme = localStorage.getItem('theme') || 'light';
        const themeIcon = this.querySelector('#theme-icon');
        if (themeIcon) {
            themeIcon.setAttribute('data-lucide', currentTheme === 'dark' ? 'sun' : 'moon');
        }

        if (window.lucide) lucide.createIcons();
    }
}
customElements.define('csrgo-header', CsrgoHeader);


class CsrgoFooter extends HTMLElement {
    connectedCallback() {
        const logoUrl = this.getAttribute('logo-url') || 'dist/logo.png';
        const brandName = this.getAttribute('brand-name') || 'CSRGO';
        const year = new Date().getFullYear();

        this.innerHTML = `
            <footer class="bg-gradient-to-t from-gray-900 via-gray-950 to-blue-950 text-white pt-16 pb-8 mt-12">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-12 text-center md:text-left">
                    <div class="md:col-span-2 flex flex-col gap-4">
                        <a href="/" class="flex items-center justify-center md:justify-start gap-1 group">
                            <img src="${logoUrl}" alt="${brandName}" class="h-10 w-10 object-contain transition-transform duration-200 group-hover:scale-105 leading-none pb-1 filter brightness-0 invert" style="max-width: 44px; min-width: 36px;" />
                            <span class="mx-1 h-7 border-l border-gray-400 dark:border-gray-300 inline-block relative -mt-1"></span>
                            <span class="text-4xl font-extrabold text-white select-none leading-none pb-1">${brandName}</span>
                        </a>
                        <p class="text-gray-300 text-sm max-w-md mx-auto md:mx-0">
                            A unified, reusable UI component library for the CSRGO ecosystem.
                        </p>
                    </div>
                    <div>
                        <h4 class="font-bold mb-3">Quick Links</h4>
                        <ul class="space-y-2 text-gray-300 text-sm">
                            <li><a href="/" class="hover:text-blue-400">Home</a></li>
                            <li><a href="/tools/" class="hover:text-blue-400">Tools</a></li>
                            <li><a href="/blog/" class="hover:text-blue-400">Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold mb-3">Legal</h4>
                        <ul class="space-y-2 text-gray-300 text-sm">
                            <li><a href="/privacy-policy/" class="hover:text-blue-400">Privacy Policy</a></li>
                            <li><a href="/terms/" class="hover:text-blue-400">Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold mb-3">CSRGO Platforms</h4>
                        <ul class="space-y-2 text-gray-300 text-sm">
                            <li><a href="https://csrgo.com" class="hover:text-blue-400" target="_blank">CSRGO.com</a></li>
                            <li><a href="https://csrgo.com/tools/" class="hover:text-blue-400">Tools</a></li>
                            <li><a href="https://csrgo.com/dsa/" class="hover:text-blue-400">DSA</a></li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-gray-800 mt-12 pt-6 text-center text-gray-400 text-sm">
                    © ${year} CSRGO. All rights reserved.
                </div>
            </footer>
            
            <button id="goToTopBtn" class="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[101] hidden items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 opacity-0 transform translate-y-4">
                <i data-lucide="chevron-up" class="w-6 h-6"></i>
            </button>
        `;

        this.setupInteractions();
    }

    setupInteractions() {
        const goToTopBtn = this.querySelector('#goToTopBtn');
        if (goToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    goToTopBtn.classList.remove('hidden', 'opacity-0', 'translate-y-4');
                    goToTopBtn.classList.add('flex', 'opacity-100', 'translate-y-0');
                } else {
                    goToTopBtn.classList.remove('flex', 'opacity-100', 'translate-y-0');
                    goToTopBtn.classList.add('hidden', 'opacity-0', 'translate-y-4');
                }
            }, { passive: true });

            goToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        if (window.lucide) lucide.createIcons();
    }
}
customElements.define('csrgo-footer', CsrgoFooter);
