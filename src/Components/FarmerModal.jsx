import { X, Phone, Mail, MapPin, User } from 'lucide-react';

function FarmerModal({ isOpen, onClose, farmer }) {
  if (!isOpen || !farmer) return null;

  return (
    <div 
      className="fixed inset-0 bg-blur bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className=" bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-green-400 to-green-500 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-white mb-1">Farmer Contact</h2>
          <p className="text-green-50">Get in touch with your local farmer</p>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Farmer Name */}
          <div className="flex items-center mb-6 pb-6 border-b border-border-light ">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <User size={32} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-content-light dark:text-content-dark">{farmer.name}</h3>
              <p className="text-content-light/70 dark:text-content-dark/70">{farmer.farm}</p>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <p className="text-content-light/80 dark:text-content-dark/80 italic leading-relaxed">{farmer.bio}</p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <Phone size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-content-light/60 dark:text-content-dark/60 mb-1">Phone</p>
                <a href={`tel:${farmer.phone}`} className="text-content-light dark:text-content-dark hover:text-green-500 transition-colors">
                  {farmer.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <Mail size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-content-light/60 dark:text-content-dark/60 mb-1">Email</p>
                <a href={`mailto:${farmer.email}`} className="text-content-light dark:text-content-dark hover:text-green-500 transition-colors break-all">
                  {farmer.email}
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <MapPin size={20} className="text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-content-light/60 dark:text-content-dark/60 mb-1">Location</p>
                <p className="text-content-light dark:text-content-dark">{farmer.location}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-3">
            <a
              href={`tel:${farmer.phone}`}
              className="flex-1 bg-green-400 hover:bg-green-500 text-content-dark font-semibold py-3 px-4 rounded-lg transition-colors text-center"
            >
              Call Now
            </a>
            <a
              href={`mailto:${farmer.email}`}
              className="flex-1 bg-green-400 hover:bg-green-500 text-content-dark font-semibold py-3 px-4 rounded-lg transition-colors text-center"
              
             
            >
              Send Email
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .bg-blur {
          backdrop-filter: blur(8px);
        }
      `}</style>
    </div>
  );
}

export default FarmerModal;