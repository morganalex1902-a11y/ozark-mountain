import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import logo from '@/assets/logo.png';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Tagline */}
          <div className="lg:col-span-1">
            <img
              src={logo}
              alt="Ozark Mountain Escape"
              className="h-40 w-auto mb-4"
            />
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Your peaceful retreat in the heart of the Ozark Mountains.
            </p>
            <div className="text-sm text-muted-foreground space-y-3">
              <div className="space-y-1">
                <p><strong>Owners:</strong> Eric & Tara Monaghen and Emma</p>
              </div>
              <p className="italic text-xs leading-relaxed pt-2 border-t border-border">
                "I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the Lord, which made heaven and earth." <br />
                <span className="text-accent">— Psalm 121:1-2</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl text-cream mb-4">Explore</h4>
            <nav className="space-y-3">
              <Link to="/cabins" className="block text-muted-foreground hover:text-accent transition-colors">
                Cabins
              </Link>
              <Link to="/rv-stays" className="block text-muted-foreground hover:text-accent transition-colors">
                RV Stays
              </Link>
              <Link to="/activities" className="block text-muted-foreground hover:text-accent transition-colors">
                Activities
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-accent transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Activities */}
          <div>
            <h4 className="font-display text-xl text-cream mb-4">Activities</h4>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li>SXS / UTV Riding</li>
              <li>Hiking Trails</li>
              <li>Kayaking & Canoeing</li>
              <li>Waterfalls</li>
              <li>Scenic Overlooks</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-xl text-cream mb-4">Contact</h4>
            <div className="space-y-4">
              <a 
                href="tel:9723429846" 
                className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors"
              >
                <Phone className="w-5 h-5 text-accent" />
                <span>(972) 342-9846</span>
              </a>
              <a
                href="mailto:Tara@ozarkmountainescape.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors"
              >
                <Mail className="w-5 h-5 text-accent" />
                <span>Tara@ozarkmountainescape.com</span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-accent mt-0.5" />
                <span>Dover, AR 72837</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Ozark Mountain Escape. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
