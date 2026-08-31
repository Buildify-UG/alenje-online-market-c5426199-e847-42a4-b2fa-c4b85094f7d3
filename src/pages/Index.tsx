import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

interface ClothingItem {
  id: number;
  name: string;
  category: 'amayi' | 'abambo' | 'ana';
  price: number;
  image: string;
  sizes: string[];
}

const clothingItems: ClothingItem[] = [
  {
    id: 1,
    name: 'Gomwe Losavuta',
    category: 'amayi',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1595777712802-18e67f1e4c0e?w=400&h=500&fit=crop',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 2,
    name: 'Chikwama Chachikulu',
    category: 'amayi',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=500&fit=crop',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 3,
    name: 'Shirt Yoyenera',
    category: 'abambo',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1596811223618-58f08add6fe7?w=400&h=500&fit=crop',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 4,
    name: 'Jeans Yoyenera',
    category: 'abambo',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=500&fit=crop',
    sizes: ['28', '30', '32', '34', '36']
  },
  {
    id: 5,
    name: 'Sukulu Yachikulu',
    category: 'ana',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1519238263413-b37e4a8e44d6?w=400&h=500&fit=crop',
    sizes: ['2-3', '4-5', '6-7', '8-9']
  },
  {
    id: 6,
    name: 'T-Shirt Yachikulu',
    category: 'ana',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1503149526-cd71b2e61e84?w=400&h=500&fit=crop',
    sizes: ['2-3', '4-5', '6-7', '8-9']
  }
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'amayi' | 'abambo' | 'ana'>('all');
  const [cart, setCart] = useState<{ item: ClothingItem; size: string }[]>([]);
  const [selectedSize, setSelectedSize] = useState<Record<number, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<'mpamba' | 'airtel' | null>(null);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' });
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const filteredItems = selectedCategory === 'all' 
    ? clothingItems 
    : clothingItems.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: ClothingItem) => {
    const size = selectedSize[item.id];
    if (!size) {
      alert('Sankhani size, chonde');
      return;
    }
    setCart([...cart, { item, size }]);
    alert('Chovala chonse chili mu chotchi');
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Chotchi chanu chili chopanda');
      return;
    }
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Lowetsani dzina ndi nambala ya foni');
      return;
    }
    setShowPaymentForm(true);
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Sankhani njira yolipira');
      return;
    }

    const orderSummary = cart
      .map(({ item, size }) => `${item.name} (Size: ${size}) - MK${item.price}`)
      .join('\n');

    const message = `*ODA YATSOPANO*\nDzina: ${customerInfo.name}\nNambala: ${customerInfo.phone}\nNjira yolipira: ${paymentMethod === 'mpamba' ? 'Mpamba' : 'Airtel Money'}\n\n${orderSummary}\n\nChitukuko: MK${cart.reduce((sum, { item }) => sum + item.price, 0)}`;

    const whatsappUrl = `https://wa.me/265888874079?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setCart([]);
    setCustomerInfo({ name: '', phone: '' });
    setPaymentMethod(null);
    setShowPaymentForm(false);
    alert('Oda yanu itumidwa! Tikusumirani.');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">🛍️ Alenje Online Market</h1>
          <p className="text-lg opacity-90">Zovala Zabwino Zomwano!</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-accent/10 py-12 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-foreground mb-4">Takulandirani ku Alenje Online Market</h2>
          <p className="text-lg text-muted-foreground mb-8">Pezani zovala zabwino ndi mitengo yabwino</p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold text-xl hover:bg-secondary transition"
          >
            Onani Zovala
          </button>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-card py-6 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { id: 'all', label: 'Zonsezi' },
              { id: 'amayi', label: 'Zovala za Amayi' },
              { id: 'abambo', label: 'Zovala za Abambo' },
              { id: 'ana', label: 'Zovala za Ana' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition border border-border">
                <img src={item.image} alt={item.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-4">MK{item.price}</p>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Sankhani Size:</label>
                    <select
                      value={selectedSize[item.id] || ''}
                      onChange={(e) => setSelectedSize({ ...selectedSize, [item.id]: e.target.value })}
                      className="w-full p-2 border border-border rounded-lg bg-input text-foreground"
                    >
                      <option value="">-- Sankhani --</option>
                      {item.sizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-secondary text-secondary-foreground py-2 rounded-lg font-bold hover:bg-secondary/90 transition"
                  >
                    Gulani Tsopano
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <section className="bg-secondary/10 py-8 px-4 border-t border-border sticky bottom-0">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-lg font-bold">Chotchi: {cart.length} zovala</p>
                <p className="text-2xl font-bold text-primary">
                  Chitukuko: MK{cart.reduce((sum, { item }) => sum + item.price, 0)}
                </p>
              </div>
              <button
                onClick={handleCheckout}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold text-lg hover:bg-secondary transition w-full sm:w-auto"
              >
                Lipira Tsopano
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Lipira Zanu</h3>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Dzina Lanu:</label>
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                placeholder="Lowetsani dzina"
                className="w-full p-2 border border-border rounded-lg bg-input text-foreground"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Nambala ya Foni:</label>
              <input
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                placeholder="0888874079"
                className="w-full p-2 border border-border rounded-lg bg-input text-foreground"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Sankhani Njira ya Kulipira:</label>
              <div className="space-y-2">
                <label className="flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                  <input
                    type="radio"
                    name="payment"
                    value="mpamba"
                    checked={paymentMethod === 'mpamba'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'mpamba')}
                    className="mr-3"
                  />
                  <span className="font-semibold">Mpamba</span>
                </label>
                <label className="flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                  <input
                    type="radio"
                    name="payment"
                    value="airtel"
                    checked={paymentMethod === 'airtel'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'airtel')}
                    className="mr-3"
                  />
                  <span className="font-semibold">Airtel Money</span>
                </label>
              </div>
              <p className="text-sm text-muted-foreground mt-3 bg-muted p-3 rounded-lg">
                Tumizani ndalama ku 0888874079 dzina: Alenje Online Market
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPaymentForm(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg font-semibold hover:bg-muted transition"
              >
                Bwerani
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold hover:bg-secondary transition"
              >
                Tumizani Oda
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle size={24} />
            <a href="https://wa.me/265888874079" className="text-lg font-bold hover:underline">
              Lumikizanani nafe pa WhatsApp: 0888874079
            </a>
          </div>
          <p className="text-sm opacity-90">© 2024 Alenje Online Market. Zonse zilungile.</p>
        </div>
      </footer>
    </div>
  );
}
