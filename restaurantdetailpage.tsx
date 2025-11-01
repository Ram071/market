import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, Star, Clock, ShoppingCart } from 'lucide-react';
import { MenuItemCard } from '../MenuItemCard';
import { restaurants, menuItems } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export const RestaurantDetailPage: React.FC = () => {
  const { selectedRestaurantId, setCurrentPage, cart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const restaurant = restaurants.find((r) => r.id === selectedRestaurantId);
  const restaurantMenuItems = menuItems.filter((item) => item.restaurantId === selectedRestaurantId);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Restaurant not found</p>
      </div>
    );
  }

  const categories = ['all', ...new Set(restaurantMenuItems.map((item) => item.category))];
  const filteredMenuItems = selectedCategory === 'all'
    ? restaurantMenuItems
    : restaurantMenuItems.filter((item) => item.category === selectedCategory);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="relative h-64 w-full overflow-hidden">
          <ImageWithFallback
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Button
            variant="ghost"
            className="absolute top-4 left-4 bg-white/90 hover:bg-white"
            onClick={() => setCurrentPage('home')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h1 className="mb-2">{restaurant.name}</h1>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-white/90 text-black">
                {restaurant.cuisine}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{restaurant.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <Badge variant="secondary" className="bg-white/90 text-black">
                {restaurant.priceRange}
              </Badge>
            </div>
          </div>
        </div>

        <div className="px-4 py-6">
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category === 'all' ? 'All Items' : category}
              </Button>
            ))}
          </div>

          <div className="grid gap-4 mb-24">
            {filteredMenuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {cartItemCount > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg">
            <div className="max-w-7xl mx-auto">
              <Button
                className="w-full"
                size="lg"
                onClick={() => setCurrentPage('cart')}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                View Cart ({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'})
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
