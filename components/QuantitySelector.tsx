'use client';

import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  min?: number;
  max?: number;
  unit?: string;
  step?: number;
}

export default function QuantitySelector({
  quantity,
  setQuantity,
  min = 0.5,
  max = 100,
  unit = 'kg',
  step = 0.5,
}: QuantitySelectorProps) {
  const decrease = () => {
    if (quantity > min) {
      setQuantity(Math.max(min, quantity - step));
    }
  };

  const increase = () => {
    if (quantity < max) {
      setQuantity(Math.min(max, quantity + step));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= min && value <= max) {
      setQuantity(value);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
        <button
          onClick={decrease}
          disabled={quantity <= min}
          className="p-3 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="h-5 w-5 text-gray-700" />
        </button>
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          className="w-20 text-center bg-transparent border-0 focus:outline-none text-lg font-semibold text-gray-800"
        />
        <button
          onClick={increase}
          disabled={quantity >= max}
          className="p-3 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-5 w-5 text-gray-700" />
        </button>
      </div>
      <span className="text-gray-600 font-medium">{unit}</span>
    </div>
  );
}
