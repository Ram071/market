import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { ArrowLeft, User, Package, Heart, Edit2, Save, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { menuItems } from '../../data/mockData';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export const UserProfilePage: React.FC = () => {
  const { userProfile, updateUserProfile, orders, favorites, setCurrentPage } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);

  const handleSave = () => {
    updateUserProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  const favoriteItems = menuItems.filter((item) => favorites.includes(item.id));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500';
      case 'confirmed':
        return 'bg-blue-500';
      case 'preparing':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentPage('home')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1>My Profile</h1>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders">
              <Package className="w-4 h-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Heart className="w-4 h-4 mr-2" />
              Favorites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3>Personal Information</h3>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={editedProfile.name}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, name: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, email: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={editedProfile.phone}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, phone: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input
                    id="address"
                    value={editedProfile.address}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, address: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <div className="space-y-4">
              {orders.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">No orders yet</p>
                    <Button onClick={() => setCurrentPage('home')}>
                      Start Ordering
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                orders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="mb-1">{order.restaurantName}</h4>
                          <p className="text-sm text-muted-foreground">
                            Order #{order.id} • {order.date}
                          </p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <Separator className="mb-4" />
                      <div className="space-y-2 mb-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>
                              {item.name} x{item.quantity}
                            </span>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <Separator className="mb-4" />
                      <div className="flex justify-between">
                        <span>Total</span>
                        <span>₹{order.total.toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="grid gap-4">
              {favoriteItems.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">No favorites yet</p>
                    <Button onClick={() => setCurrentPage('home')}>
                      Browse Menu
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                favoriteItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-1">{item.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span>₹{item.price}</span>
                            <Badge variant="secondary">{item.category}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
