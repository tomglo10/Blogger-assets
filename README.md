Here’s your full  scaffold for the  CDN repo, modularized for maintainers and performance auditors:

🧱 Blogger Cleanup CDN
Modular fragments to suppress Blogger’s injected assets, optimize LCP, defer unused JS, and lazy-load offscreen images. Built for audit overlays, maintainers, and performance-first Blogger templates.

📦 Modules
1. 
Suppresses Blogger’s default styles and layout quirks.
• 	Hides , , , and injected logos
• 	Resets layout shifts from caption containers
• 	Use in :


2. 
Disables Blogger’s widget manager and removes injected scripts.
• 	Overrides 
• 	Removes 
• 	Use in :


3.  + 
Optimizes Largest Contentful Paint (LCP) by stabilizing hero image layout and logging discovery.
• 	Adds , , and max-width to 
• 	Injects audit badge: 
• 	Use in :


4. 
Suppresses heavy injected JS from Blogger and Google (e.g. reCAPTCHA, widget bundles).
• 	Removes  and Blogger’s  bundles
• 	Logs savings estimate: 
• 	Use in :


5.  + 
Defers offscreen images and highlights lazy-loaded elements.
• 	Adds  to offscreen  tags
• 	Injects badge: 
• 	Outlines deferred images with dashed orange border
• 	Use in :


🏷️ Versioning
Use semantic tags (, , etc.) for stable CDN links:


🧪 Audit Tips
• 	Use Chrome DevTools → Performance → Screenshots to verify LCP image discovery
• 	Use Lighthouse → Diagnostics → Layout Shift and JS Transfer Size
• 	Confirm badge overlays for active modules
### 6. `semantic-audit.js`
Highlights unlabeled form fields and orphaned `<li>` elements for accessibility compliance.

- Adds dashed red outline to inputs missing `id` or `<label>`
- Adds dashed orange outline to `<li>`s outside `<ul>` or `<ol>`
- Injects badge: `Semantic Audit Active`

