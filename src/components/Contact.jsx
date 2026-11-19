// src/components/Contact.jsx
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLang } from "../i18n/LangContext";

export default function Contact() {
  const { t } = useLang();

  const info = [
    { icon: MapPin, label: t("contact_address"), val: t("contact_address_val") },
    { icon: Phone,  label: t("contact_phone"),   val: t("contact_phone_val")   },
    { icon: Mail,   label: t("contact_email"),   val: t("contact_email_val")   },
    { icon: Clock,  label: t("contact_hours"),   val: t("contact_hours_val")   },
  ];

  return (
    <section id="contact" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-navy-800 section-heading mb-10">
          {t("contact_title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Info cards */}
          <div className="space-y-4">
            {info.map(({ icon: Icon, label, val }) => (
              <div key={label} className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-lg px-4 py-4">
                <div className="bg-saffron-100 rounded-full p-2 mt-0.5 flex-shrink-0">
                  <Icon size={18} className="text-saffron-700" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">{label}</p>
                  <p className="text-navy-800 font-medium text-sm">{val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm h-72 md:h-auto bg-gray-100 flex items-center justify-center">
            <iframe
              title="School Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.6!2d75.3433!3d19.8762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDUyJzM0LjMiTiA3NcKwMjAnMzUuOSJF!5e0!3m2!1sen!2sin!4v1680000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
