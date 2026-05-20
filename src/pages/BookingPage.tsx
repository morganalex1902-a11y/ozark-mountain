import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, AlertCircle, Home, Truck } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type PropertyType = 'cabin' | 'rv';
type Step = 'property' | 'dates' | 'details' | 'payment' | 'confirmation';

interface BookingData {
  propertyType: PropertyType;
  checkIn: string;
  checkOut: string;
  guests: string;
  roomType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  cardName: string;
}

interface RoomType {
  id: string;
  name: string;
  price: number;
  desc: string;
  comingSoon?: boolean;
}

const initialBooking: BookingData = {
  propertyType: 'cabin',
  checkIn: '',
  checkOut: '',
  guests: '2',
  roomType: 'standard',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
  cardName: ''
};

const cabinRooms = [
  { id: 'standard', name: 'Our Cabin', price: 150, desc: 'Sleeps up to 6 people • Full amenities' }
];

const rvRooms = [
  { id: 'standard', name: 'Standard RV', price: 150, desc: 'Master bedroom + living area', comingSoon: true },
  { id: 'deluxe', name: 'Deluxe RV', price: 200, desc: 'Master bedroom + bunk room + living area', comingSoon: true },
  { id: 'suite', name: 'Premium Suite', price: 250, desc: 'All amenities + premium furnishings', comingSoon: true }
];

const stepTitles: Record<Step, string> = {
  property: 'Choose Your Accommodation',
  dates: 'Select Your Dates',
  details: 'Guest Information',
  payment: 'Payment Details',
  confirmation: 'Booking Confirmed'
};

const steps: Step[] = ['property', 'dates', 'details', 'payment', 'confirmation'];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState<Step>('property');
  const [booking, setBooking] = useState<BookingData>(initialBooking);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentStepIndex = steps.indexOf(currentStep);
  const roomTypes = booking.propertyType === 'cabin' ? cabinRooms : rvRooms;

  const calculateNights = () => {
    if (!booking.checkIn || !booking.checkOut) return 0;
    const check = new Date(booking.checkIn);
    const checkout = new Date(booking.checkOut);
    return Math.ceil((checkout.getTime() - check.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getSelectedRoom = () => roomTypes.find(r => r.id === booking.roomType);
  const nights = calculateNights();
  const pricePerNight = getSelectedRoom()?.price || 0;
  const totalPrice = nights * pricePerNight;

  const propertyLabel = booking.propertyType === 'cabin' ? 'Cabin' : 'RV';

  const validateProperty = () => {
    if (!booking.propertyType) {
      setErrors({ propertyType: 'Please select an accommodation type' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateDates = () => {
    const errs: Record<string, string> = {};
    if (!booking.checkIn) errs.checkIn = 'Check-in date is required';
    if (!booking.checkOut) errs.checkOut = 'Check-out date is required';
    if (booking.checkIn && booking.checkOut && new Date(booking.checkOut) <= new Date(booking.checkIn)) {
      errs.checkOut = 'Check-out must be after check-in';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateDetails = () => {
    const errs: Record<string, string> = {};
    if (!booking.firstName.trim()) errs.firstName = 'First name is required';
    if (!booking.lastName.trim()) errs.lastName = 'Last name is required';
    if (!booking.email.trim()) errs.email = 'Email is required';
    if (booking.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) {
      errs.email = 'Invalid email format';
    }
    if (!booking.phone.trim()) errs.phone = 'Phone number is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePayment = () => {
    const errs: Record<string, string> = {};
    if (!booking.cardNumber.replace(/\s/g, '')) errs.cardNumber = 'Card number is required';
    if (!booking.cardExpiry) errs.cardExpiry = 'Expiry date is required';
    if (!booking.cardCvc) errs.cardCvc = 'CVC is required';
    if (!booking.cardName.trim()) errs.cardName = 'Cardholder name is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 'property' && !validateProperty()) return;
    if (currentStep === 'dates' && !validateDates()) return;
    if (currentStep === 'details' && !validateDetails()) return;
    if (currentStep === 'payment' && !validatePayment()) return;

    if (currentStep === 'payment') {
      setCurrentStep('confirmation');
    } else {
      const nextIndex = currentStepIndex + 1;
      if (nextIndex < steps.length) {
        setCurrentStep(steps[nextIndex]);
      }
    }
  };

  const handlePrev = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBooking(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="font-display text-5xl md:text-6xl text-cream">
            Book Your Stay
          </h1>
        </motion.div>
      </section>

      {/* Booking Form Section */}
      <section className="section-padding bg-card min-h-[600px]">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex justify-between mb-8">
              {steps.map((step, idx) => (
                <div key={step} className="flex flex-col items-center flex-1">
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: idx <= currentStepIndex ? '#a19a8d' : '#2a2a2a',
                      scale: idx === currentStepIndex ? 1.1 : 1
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-2 text-sm font-semibold text-background transition-colors"
                  >
                    {idx < currentStepIndex ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      idx + 1
                    )}
                  </motion.div>
                  <span className={`text-xs text-center ${idx <= currentStepIndex ? 'text-cream font-semibold' : 'text-muted-foreground'}`}>
                    {stepTitles[step]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Summary Card */}
          {(currentStep !== 'confirmation' && currentStep !== 'property') && (
            <Card className="mb-8 bg-background/50 border-accent/30">
              <CardContent className="pt-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property:</span>
                    <span className="text-cream capitalize">{booking.propertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Check-in:</span>
                    <span className="text-cream">{booking.checkIn || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Check-out:</span>
                    <span className="text-cream">{booking.checkOut || '-'}</span>
                  </div>
                  {nights > 0 && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{nights} Night{nights !== 1 ? 's' : ''} × ${pricePerNight}/night</span>
                        <span className="text-cream">${nights * pricePerNight}</span>
                      </div>
                      <div className="border-t border-accent/20 pt-2 font-semibold flex justify-between">
                        <span className="text-cream">Total:</span>
                        <span className="text-accent text-lg">${totalPrice}</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Form Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Property Type */}
              {currentStep === 'property' && (
                <div className="space-y-6">
                  <p className="text-muted-foreground text-center mb-8">
                    Select the accommodation type for your stay
                  </p>
                  <RadioGroup value={booking.propertyType} onValueChange={(value) => {
                    setBooking(prev => ({ 
                      ...prev, 
                      propertyType: value as PropertyType,
                      roomType: value === 'cabin' ? 'standard' : 'standard'
                    }));
                    if (errors.propertyType) {
                      setErrors(prev => ({ ...prev, propertyType: '' }));
                    }
                  }}>
                    <div className="space-y-4">
                      {[
                        { 
                          id: 'cabin', 
                          icon: Home,
                          name: 'Cabin Stay', 
                          desc: 'Cozy cabin with full amenities • Sleeps up to 6' 
                        },
                        { 
                          id: 'rv', 
                          icon: Truck,
                          name: 'RV Stay', 
                          desc: 'Modern RV with multiple room options' 
                        }
                      ].map(option => {
                        const Icon = option.icon;
                        return (
                          <div key={option.id} className="flex items-center space-x-3 p-4 rounded-lg border border-accent/20 bg-background/50 hover:border-accent/50 cursor-pointer">
                            <RadioGroupItem value={option.id} id={option.id} />
                            <Icon className="w-6 h-6 text-accent" />
                            <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                              <div className="font-semibold text-cream">{option.name}</div>
                              <div className="text-sm text-muted-foreground">{option.desc}</div>
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </RadioGroup>
                  {errors.propertyType && <p className="text-red-500 text-sm mt-2">{errors.propertyType}</p>}
                </div>
              )}

              {/* Step 2: Dates */}
              {currentStep === 'dates' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="checkIn" className="text-cream mb-2 block">Check-in Date</Label>
                      <Input
                        id="checkIn"
                        name="checkIn"
                        type="date"
                        value={booking.checkIn}
                        onChange={handleInputChange}
                        className={`bg-background border-accent/30 text-cream ${errors.checkIn ? 'border-red-500' : ''}`}
                      />
                      {errors.checkIn && <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>}
                    </div>
                    <div>
                      <Label htmlFor="checkOut" className="text-cream mb-2 block">Check-out Date</Label>
                      <Input
                        id="checkOut"
                        name="checkOut"
                        type="date"
                        value={booking.checkOut}
                        onChange={handleInputChange}
                        className={`bg-background border-accent/30 text-cream ${errors.checkOut ? 'border-red-500' : ''}`}
                      />
                      {errors.checkOut && <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>}
                    </div>
                  </div>

                  <div>
                    <Label className="text-cream mb-4 block">Number of Guests</Label>
                    <select
                      name="guests"
                      value={booking.guests}
                      onChange={handleInputChange}
                      className="w-full bg-background border border-accent/30 text-cream rounded-md px-4 py-2"
                    >
                      {[1, 2, 3, 4, 5, 6].map(n => (
                        <option key={n} value={n}>{n} Guest{n !== 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="text-cream mb-4 block">Room Type</Label>
                    <RadioGroup value={booking.roomType} onValueChange={(value) => setBooking(prev => ({ ...prev, roomType: value }))}>
                      <div className="space-y-3">
                        {roomTypes.map((room: RoomType) => (
                          <div key={room.id} className={`flex items-center space-x-3 p-3 rounded-lg border border-accent/20 bg-background/50 hover:border-accent/50 cursor-pointer ${room.comingSoon ? 'opacity-60' : ''}`}>
                            <RadioGroupItem value={room.id} id={room.id} disabled={room.comingSoon} />
                            <Label htmlFor={room.id} className={`flex-1 ${room.comingSoon ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                              <div className="font-semibold text-cream">{room.name}</div>
                              <div className="text-sm text-muted-foreground">{room.desc}</div>
                              <div className="text-sm text-accent font-semibold mt-1">${room.price}/night</div>
                              {room.comingSoon && <div className="text-xs text-amber-400 mt-1 font-semibold">Coming Soon</div>}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Step 3: Guest Details */}
              {currentStep === 'details' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-cream mb-2 block">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={booking.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className={`bg-background border-accent/30 text-cream ${errors.firstName ? 'border-red-500' : ''}`}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-cream mb-2 block">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={booking.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className={`bg-background border-accent/30 text-cream ${errors.lastName ? 'border-red-500' : ''}`}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-cream mb-2 block">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={booking.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className={`bg-background border-accent/30 text-cream ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-cream mb-2 block">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={booking.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 000-0000"
                      className={`bg-background border-accent/30 text-cream ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <Alert className="bg-accent/10 border-accent/30">
                    <AlertCircle className="h-4 w-4 text-accent" />
                    <AlertDescription className="text-muted-foreground">
                      A confirmation email will be sent to the address you provide.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Step 4: Payment */}
              {currentStep === 'payment' && (
                <div className="space-y-6">
                  <Alert className="bg-amber-500/10 border-amber-500/30">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <AlertDescription className="text-muted-foreground">
                      This is a demo payment form. No actual charges will be made.
                    </AlertDescription>
                  </Alert>

                  <div>
                    <Label htmlFor="cardName" className="text-cream mb-2 block">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      value={booking.cardName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className={`bg-background border-accent/30 text-cream ${errors.cardName ? 'border-red-500' : ''}`}
                    />
                    {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="cardNumber" className="text-cream mb-2 block">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={booking.cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        setBooking(prev => ({ ...prev, cardNumber: formatted }));
                        if (errors.cardNumber) setErrors(prev => ({ ...prev, cardNumber: '' }));
                      }}
                      placeholder="4532 1234 5678 9010"
                      className={`bg-background border-accent/30 text-cream ${errors.cardNumber ? 'border-red-500' : ''}`}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="cardExpiry" className="text-cream mb-2 block">Expiry Date</Label>
                      <Input
                        id="cardExpiry"
                        name="cardExpiry"
                        value={booking.cardExpiry}
                        onChange={(e) => {
                          const formatted = formatExpiry(e.target.value);
                          setBooking(prev => ({ ...prev, cardExpiry: formatted }));
                          if (errors.cardExpiry) setErrors(prev => ({ ...prev, cardExpiry: '' }));
                        }}
                        placeholder="MM/YY"
                        className={`bg-background border-accent/30 text-cream ${errors.cardExpiry ? 'border-red-500' : ''}`}
                      />
                      {errors.cardExpiry && <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>}
                    </div>
                    <div>
                      <Label htmlFor="cardCvc" className="text-cream mb-2 block">CVC</Label>
                      <Input
                        id="cardCvc"
                        name="cardCvc"
                        value={booking.cardCvc}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                          setBooking(prev => ({ ...prev, cardCvc: value }));
                          if (errors.cardCvc) setErrors(prev => ({ ...prev, cardCvc: '' }));
                        }}
                        placeholder="123"
                        className={`bg-background border-accent/30 text-cream ${errors.cardCvc ? 'border-red-500' : ''}`}
                      />
                      {errors.cardCvc && <p className="text-red-500 text-sm mt-1">{errors.cardCvc}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Confirmation */}
              {currentStep === 'confirmation' && (
                <div className="space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="text-center mb-8"
                  >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="font-display text-3xl text-cream mb-2">Booking Confirmed!</h2>
                    <p className="text-muted-foreground">Your {propertyLabel} stay has been successfully booked.</p>
                  </motion.div>

                  <Card className="bg-background/50 border-accent/30">
                    <CardHeader>
                      <CardTitle className="text-cream">Booking Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-muted-foreground text-sm mb-1">Property Type</p>
                          <p className="text-cream font-semibold capitalize">{booking.propertyType}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm mb-1">Room Type</p>
                          <p className="text-cream font-semibold">{getSelectedRoom()?.name}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm mb-1">Guest Name</p>
                          <p className="text-cream font-semibold">{booking.firstName} {booking.lastName}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm mb-1">Email</p>
                          <p className="text-cream font-semibold">{booking.email}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm mb-1">Check-in</p>
                          <p className="text-cream font-semibold">{booking.checkIn}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm mb-1">Check-out</p>
                          <p className="text-cream font-semibold">{booking.checkOut}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm mb-1">Number of Guests</p>
                          <p className="text-cream font-semibold">{booking.guests}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm mb-1">Total Cost</p>
                          <p className="text-accent font-semibold text-lg">${totalPrice}</p>
                        </div>
                      </div>

                      <div className="border-t border-accent/20 pt-4 mt-4">
                        <p className="text-muted-foreground text-sm mb-2">Confirmation Details</p>
                        <p className="text-cream text-sm">
                          A confirmation email with your booking details and check-in instructions has been sent to <strong>{booking.email}</strong>. Please check your inbox.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Alert className="bg-green-500/10 border-green-500/30">
                    <Check className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-muted-foreground">
                      Thank you for booking with Ozark Mountain Escape! We look forward to hosting you.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4 mt-12">
            <Button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              variant="outline"
              className={currentStepIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            {currentStep !== 'confirmation' ? (
              <Button
                onClick={handleNext}
                className="bg-accent hover:bg-accent/90 text-background"
              >
                {currentStep === 'payment' ? 'Complete Booking' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={() => window.location.href = '/'}
                className="bg-accent hover:bg-accent/90 text-background"
              >
                Back to Home
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
