import data from '../../content/contact.json';
export const contact = data;
export const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;
