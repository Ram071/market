import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { CheckCircle2, Clock, ChefHat, Truck, Home } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OrderConfirmationPage: React.FC = () => {
  const { currentOrder, setCurrentPage } = useApp();
  const [status, setStatus] = useState<'confirmed' | 'preparing' | 'delivering'>('confirmed');

  useEffect(() => {
    const timer1 = setTimeout(() => setStatus('preparing'), 3000);
    const timer2 = setTimeout(() => setStatus('delivering'), 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No order found</p>
            <Button onClick={() => setCurrentPage('home')}>
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="w-12 h-12 text-green-500" />;
      case 'preparing':
        return <ChefHat className="w-12 h-12 text-blue-500" />;
      case 'delivering':
        return <Truck className="w-12 h-12 text-orange-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'confirmed':
        return 'Order Confirmed!';
      case 'preparing':
        return 'Preparing Your Order';
      case 'delivering':
        return 'Out for Delivery';
      default:
        return 'Processing';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardContent className="py-12 text-center">
            <div className="flex justify-center mb-4">
              {getStatusIcon()}
            </div>
            <h1 className="mb-2">{getStatusText()}</h1>
            <p className="text-muted-foreground mb-6">
              Your order from {currentOrder.restaurantName} has been placed successfully
            </p>
            <div className="flex justify-center gap-8 max-w-md mx-auto">
              <div className={`flex flex-col items-center ${status === 'confirmed' ? 'text-green-500' : 'text-muted-foreground'}`}>
                <CheckCircle2 className="w-6 h-6 mb-2" />
                <span className="text-xs">Confirmed</span>
              </div>
              <div className={`flex flex-col items-center ${status === 'preparing' ? 'text-blue-500' : 'text-muted-foreground'}`}>
                <ChefHat className="w-6 h-6 mb-2" />
                <span className="text-xs">Preparing</span>
              </div>
              <div className={`flex flex-col items-center ${status === 'delivering' ? 'text-orange-500' : 'text-muted-foreground'}`}>
                <Truck className="w-6 h-6 mb-2" />
                <span className="text-xs">Delivering</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>Order Details</h3>
              <Badge>Order #{currentOrder.id}</Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Clock className="w-4 h-4" />
              <span>Estimated delivery: 25-35 minutes</span>
            </div>
            <Separator className="mb-4" />
            <div className="space-y-3">
              {currentOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p>{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between">
              <span>Total</span>
              <span>₹{currentOrder.total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setCurrentPage('profile')}
          >
            View Orders
          </Button>
          <Button
            className="flex-1"
            onClick={() => setCurrentPage('home')}
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};
