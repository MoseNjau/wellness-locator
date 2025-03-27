
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <div className="page-container pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Contact Us</h1>
          <p className="text-foreground/70 mb-8 text-lg animate-fade-in animation-delay-100">
            We'd love to hear from you. Reach out with questions, feedback, or to report inaccurate information.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card rounded-xl p-6 animate-fade-in animation-delay-200">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-foreground/70 mb-2">
                For general inquiries or support:
              </p>
              <a href="mailto:info@wellnesslocator.co.ke" className="text-primary hover:underline">
                info@wellnesslocator.co.ke
              </a>
            </div>
            
            <div className="glass-card rounded-xl p-6 animate-fade-in animation-delay-300">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-foreground/70 mb-2">
                Monday to Friday, 8am - 5pm:
              </p>
              <a href="tel:+254700123456" className="text-primary hover:underline">
                +254 700 123 456
              </a>
            </div>
            
            <div className="glass-card rounded-xl p-6 animate-fade-in animation-delay-400">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-foreground/70 mb-2">
                Our office is located at:
              </p>
              <address className="not-italic">
                Kiambu Road, Kiambu Town<br />
                Kiambu County, Kenya
              </address>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="animate-fade-in animation-delay-500">
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground/70 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="generalInquiry">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="reportInaccuracy">Report Inaccurate Information</option>
                    <option value="suggestFacility">Suggest New Facility</option>
                    <option value="partnership">Partnership Opportunity</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/70 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={loading || success}
                    className={`w-full inline-flex items-center justify-center px-4 py-3 rounded-lg text-white font-medium transition-all ${
                      success 
                        ? 'bg-green-500' 
                        : loading 
                          ? 'bg-primary/70 cursor-not-allowed' 
                          : 'bg-primary hover:bg-primary/90'
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : success ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            <div className="animate-fade-in animation-delay-600">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div className="glass-panel rounded-xl p-4">
                  <h3 className="font-semibold mb-2">How do I suggest a new healthcare facility?</h3>
                  <p className="text-foreground/70 text-sm">
                    You can suggest a new facility by contacting us through the form on this page. 
                    Select "Suggest New Facility" as the subject and provide all relevant details.
                  </p>
                </div>
                
                <div className="glass-panel rounded-xl p-4">
                  <h3 className="font-semibold mb-2">How can I report inaccurate information?</h3>
                  <p className="text-foreground/70 text-sm">
                    If you notice any incorrect information about a facility, please use our contact form 
                    with the subject "Report Inaccurate Information" and specify the facility name and the 
                    correction needed.
                  </p>
                </div>
                
                <div className="glass-panel rounded-xl p-4">
                  <h3 className="font-semibold mb-2">Is this service available for other counties?</h3>
                  <p className="text-foreground/70 text-sm">
                    Currently, Wellness Locator is focused on Kiambu County. We plan to expand to other 
                    counties in the future. Stay tuned for updates!
                  </p>
                </div>
                
                <div className="glass-panel rounded-xl p-4">
                  <h3 className="font-semibold mb-2">How often is the information updated?</h3>
                  <p className="text-foreground/70 text-sm">
                    We update our database regularly to ensure accuracy. Healthcare facilities can also 
                    request updates to their information by contacting us directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t border-border py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-primary text-3xl mr-2">●</span>
              <span className="font-bold text-lg">Wellness Locator</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <Link to="/" className="text-foreground/70 hover:text-primary">Home</Link>
              <Link to="/directory" className="text-foreground/70 hover:text-primary">Directory</Link>
              <Link to="/about" className="text-foreground/70 hover:text-primary">About</Link>
              <Link to="/contact" className="text-foreground/70 hover:text-primary">Contact</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-foreground/50">
            <p>© {new Date().getFullYear()} Wellness Locator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
