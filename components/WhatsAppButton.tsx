'use client';

import { Product } from '@/lib/types';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  product: Product;
  quantity: number;
}

export default function WhatsAppButton({ product, quantity }: WhatsAppButtonProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+9779866335500';
  
  const handleClick = () => {
    const totalPrice = product.price * quantity;
    const unitName = product.unit.replace('per ', '');
    
    const message = `🍬 *Order Request from Mithai Shop*

📦 *Product Details:*
━━━━━━━━━━━━━━━
• Name: ${product.name}
• Category: ${product.category}
• Price: ₹${product.price} ${product.unit}
• Quantity: ${quantity} ${unitName}
━━━━━━━━━━━━━━━

💰 *Total Amount: ₹${totalPrice.toFixed(2)}*

Please confirm my order. Thank you! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      disabled={!product.isAvailable}
      className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-full font-semibold text-lg transition-all ${
        product.isAvailable
          ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
    >
      <MessageCircle className="h-6 w-6" />
      {product.isAvailable ? 'Buy on WhatsApp' : 'Currently Unavailable'}
    </button>
  );
}
