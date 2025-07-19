import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from '../../services/email.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section id="contact" class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to start your journey? Contact us today and let us help you plan your perfect vacation
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send us a Message
            </h3>
            
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <!-- Name -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  formControlName="name"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors"
                  placeholder="Enter your full name">
                <div *ngIf="getFieldError('name')" class="text-red-500 text-sm mt-1">
                  {{ getFieldError('name') }}
                </div>
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  formControlName="email"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors"
                  placeholder="Enter your email address">
                <div *ngIf="getFieldError('email')" class="text-red-500 text-sm mt-1">
                  {{ getFieldError('email') }}
                </div>
              </div>

              <!-- Phone -->
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  formControlName="phone"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors"
                  placeholder="Enter your phone number">
                <div *ngIf="getFieldError('phone')" class="text-red-500 text-sm mt-1">
                  {{ getFieldError('phone') }}
                </div>
              </div>

              <!-- Destination -->
              <div>
                <label for="destination" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Destination
                </label>
                <select
                  id="destination"
                  formControlName="destination"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors">
                  <option value="">Select a destination</option>
                  <option *ngFor="let dest of destinations" [value]="dest">{{ dest }}</option>
                </select>
              </div>

              <!-- Travel Dates -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="startDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    formControlName="startDate"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors">
                </div>
                <div>
                  <label for="endDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    formControlName="endDate"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors">
                </div>
              </div>

              <!-- Travelers -->
              <div>
                <label for="travelers" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Number of Travelers
                </label>
                <select
                  id="travelers"
                  formControlName="travelers"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors">
                  <option value="1">1 Traveler</option>
                  <option value="2">2 Travelers</option>
                  <option value="3">3 Travelers</option>
                  <option value="4">4 Travelers</option>
                  <option value="5+">5+ Travelers</option>
                </select>
              </div>

              <!-- Budget -->
              <div>
                <label for="budget" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Budget Range
                </label>
                <select
                  id="budget"
                  formControlName="budget"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors">
                  <option value="">Select budget range</option>
                  <option value="under-3k">Under ₹3,000</option>
                  <option value="3k-10k">₹3,000 - ₹10,000</option>
                  <option value="10k-25k">₹10,000 - ₹25,000</option>
                  <option value="25k-50k">₹25,000 - ₹50,000</option>
                  <option value="50k-100k">₹50,000 - ₹1,00,000</option>
                  <option value="above-100k">Above ₹1,00,000</option>
                  <option value="custom">Custom Package</option>
                </select>
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  formControlName="message"
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors resize-none"
                  placeholder="Tell us about your travel preferences, special requirements, or any questions..."></textarea>
                <div *ngIf="getFieldError('message')" class="text-red-500 text-sm mt-1">
                  {{ getFieldError('message') }}
                </div>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                [disabled]="!contactForm.valid || isSubmitting"
                class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-lg">
                <span *ngIf="isSubmitting">Sending...</span>
                <span *ngIf="!isSubmitting">Send Message</span>
              </button>

              <!-- Success Message -->
              <div *ngIf="isSubmitted" class="text-center p-4 bg-green-100 text-green-800 rounded-lg">
                <span class="text-2xl">✅</span>
                <p class="font-semibold">Message sent successfully!</p>
                <p class="text-sm">We'll get back to you within 24 hours.</p>
              </div>
            </form>
          </div>

          <!-- Success Popup Modal -->
          <div *ngIf="showSuccessPopup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" (click)="closeSuccessPopup()">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-4 transform transition-all duration-300 scale-100" (click)="$event.stopPropagation()">
              <div class="text-center">
                <!-- Success Icon with Animation -->
                <div class="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                  <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                
                <!-- Success Message -->
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Message Sent Successfully! 🎉
                </h3>
                
                <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Thank you for contacting <span class="font-semibold text-blue-600">Cholo Bondhu</span>! 
                  We've received your travel inquiry and our team will get back to you within 
                  <span class="font-semibold">24 hours</span>.
                </p>
                
                <!-- Contact Information -->
                <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                  <p class="text-sm text-blue-700 dark:text-blue-300">
                    <span class="font-semibold">📧 Email:</span> cholobondhutour&#64;gmail.com<br>
                    <span class="font-semibold">📱 Phone:</span> +91 81002 82665
                  </p>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-3">
                  <button 
                    (click)="closeSuccessPopup()" 
                    class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Continue Exploring
                  </button>
                  <button 
                    (click)="viewPackages()" 
                    class="flex-1 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-semibold">
                    View Packages
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8">
            <!-- Contact Details -->
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
              <!-- Company Logo -->
              <div class="text-center mb-8">
                <div class="w-20 h-20 mx-auto mb-4 bg-white rounded-full shadow-lg overflow-hidden">
                  <img 
                    src="/assets/destinations/cholobondhu-logo.jpg" 
                    alt="Cholo Bondhu Logo" 
                    class="w-full h-full object-contain"
                  />
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Cholo Bondhu
                </h3>
                <p class="text-gray-600 dark:text-gray-300">Your Travel Companion</p>
              </div>

              <h4 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h4>
              
              <div class="space-y-6">
                <div *ngFor="let contact of contactInfo" class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl">
                    {{ contact.icon }}
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white mb-1">{{ contact.title }}</h4>
                    <p class="text-gray-600 dark:text-gray-300">{{ contact.value }}</p>
                    <p *ngIf="contact.subtitle" class="text-sm text-gray-500 dark:text-gray-400">{{ contact.subtitle }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Office Hours -->
            <div class="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
              <h3 class="text-2xl font-bold mb-6">Office Hours</h3>
              <div class="space-y-3">
                <div *ngFor="let hour of officeHours" class="flex justify-between items-center">
                  <span class="font-medium">{{ hour.day }}</span>
                  <span class="text-blue-100">{{ hour.time }}</span>
                </div>
              </div>
              <div class="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <p class="text-sm text-blue-100">
                  <span class="text-yellow-300">📞</span>
                  Emergency support available 24/7 for travelers
                </p>
              </div>
            </div>

            <!-- Social Media -->
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Follow Us
              </h3>
              <div class="grid grid-cols-3 gap-4">
                <a *ngFor="let social of socialMedia" 
                   [href]="social.url"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group">
                  <div class="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border-2 border-gray-100 dark:border-gray-700 group-hover:border-white group-hover:shadow-xl transition-all duration-300">
                    <!-- Facebook Icon -->
                    <svg *ngIf="social.icon === 'facebook'" class="w-6 h-6" [style.color]="social.color" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <!-- Instagram Icon -->
                    <svg *ngIf="social.icon === 'instagram'" class="w-6 h-6" [style.color]="social.color" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <!-- WhatsApp Icon -->
                    <svg *ngIf="social.icon === 'whatsapp'" class="w-6 h-6" [style.color]="social.color" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                    </svg>
                  </div>
                  <div class="flex flex-col">
                    <span class="font-semibold text-gray-900 dark:text-white text-sm">{{ social.name }}</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                      {{ social.icon === 'whatsapp' ? 'Quick chat' : 'Follow us' }}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    input:focus, select:focus, textarea:focus {
      outline: none;
    }

    /* Popup Animation */
    .fixed.inset-0 {
      animation: fadeIn 0.3s ease-out;
    }

    .fixed.inset-0 > div {
      animation: slideUp 0.3s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    /* Success icon bounce animation */
    .animate-bounce {
      animation: bounce 1s infinite;
    }

    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    /* Hover effects for buttons */
    button:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    /* Smooth transitions */
    * {
      transition: all 0.2s ease;
    }
  `]
})
export class ContactUsComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  showSuccessPopup = false;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private router: Router,
    private layoutService: LayoutService
  ) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\d\s\-\+\(\)]+$/)]],
      destination: [''],
      startDate: [''],
      endDate: [''],
      travelers: ['2'],
      budget: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  destinations = [
    'Darjeeling',
    'Sikkim',
    'Sundarbans',
    'Digha',
    'Bakkhali',
    'Goa',
    'Kerala',
    'Rajasthan',
    'Himachal Pradesh',
    'Ladakh',
    'Andaman',
    'Northeast India',
    'South India',
    'Golden Triangle',
    'Custom Package'
  ];

  contactInfo = [
    {
      icon: '📍',
      title: 'Address',
      value: 'Bagnan, Howrah',
      subtitle: 'Pin: 711303, West Bengal, India'
    },
    {
      icon: '📞',
      title: 'Phone',
      value: '+91 81002 82665',
      subtitle: 'Mon-Sat 9AM-7PM'
    },
    {
      icon: '📧',
      title: 'Email',
      value: 'cholobondhutour@gmail.com',
      subtitle: 'We reply within 24 hours'
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      value: '+91 81002 82665',
      subtitle: 'Quick support via WhatsApp'
    }
  ];

  officeHours = [
    { day: 'Monday - Friday', time: '9:00 AM - 7:00 PM' },
    { day: 'Saturday', time: '9:00 AM - 5:00 PM' },
    { day: 'Sunday', time: 'Closed' }
  ];

  socialMedia = [
    { 
      name: 'Facebook', 
      icon: 'facebook', 
      url: 'https://www.facebook.com/CholoBondhuTravelAgency',
      color: '#1877F2' 
    },
    { 
      name: 'Instagram', 
      icon: 'instagram', 
      url: 'https://instagram.com/cholobondhutourandtravels',
      color: '#E4405F' 
    },
    { 
      name: 'WhatsApp', 
      icon: 'whatsapp', 
      url: 'https://wa.me/918100282665',
      color: '#25D366' 
    }
  ];

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      try {
        // Send email using EmailJS
        const formData = this.contactForm.value;
        await this.emailService.sendContactForm(formData);
        
        this.isSubmitting = false;
        this.showSuccessPopup = true; // Show popup instead of inline message
        
        // Reset form
        this.contactForm.reset();
        this.contactForm.patchValue({ travelers: '2' }); // Set default value
      } catch (error) {
        this.isSubmitting = false;
        console.error('Error sending email:', error);
        alert('Failed to send message. Please try again or contact us directly.');
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  closeSuccessPopup(): void {
    this.showSuccessPopup = false;
    this.isSubmitted = false;
  }

  viewPackages(): void {
    this.showSuccessPopup = false;
    this.router.navigate(['/tour-packages']).then(() => {
      setTimeout(() => this.layoutService.scrollToTopInstant(), 100);
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['pattern']) return 'Please enter a valid phone number';
    }
    return '';
  }
}
