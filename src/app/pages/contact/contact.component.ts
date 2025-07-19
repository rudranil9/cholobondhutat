import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from '../../services/email.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <!-- Professional Hero Section -->
      <section class="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        <!-- Subtle Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0" style="background-image: linear-gradient(30deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6), linear-gradient(150deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6), linear-gradient(30deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6), linear-gradient(150deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6); background-size: 80px 80px; background-position: 0 0, 0 0, 40px 40px, 40px 40px;"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="text-center">
            <!-- Professional Logo Presentation -->
            <div class="mb-12">
              <div class="inline-block relative">
                <div class="w-28 h-28 mx-auto bg-white rounded-full shadow-2xl overflow-hidden border-4 border-white relative">
                  <img 
                    src="/assets/destinations/cholobondhu-logo.jpg" 
                    alt="Cholo Bondhu Logo" 
                    class="w-full h-full object-contain"
                  />
                  <!-- Professional Glow Effect -->
                  <div class="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>

            <!-- Professional Typography -->
            <div class="mb-8">
              <h1 class="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Contact 
                <span class="relative inline-block">
                  <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    Us
                  </span>
                  <div class="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transform scale-x-0 animate-scale-x"></div>
                </span>
              </h1>
              
              <!-- Professional Subtitle -->
              <div class="max-w-4xl mx-auto">
                <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-light mb-8">
                  Ready to start your next adventure? Get in touch with our travel experts and let us help you create unforgettable memories.
                </p>
                
                <!-- Professional Contact Info -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  <div class="flex flex-col items-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                    <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                      <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Phone</h3>
                    <p class="text-gray-600 dark:text-gray-300 text-sm">+91 81002 82665</p>
                  </div>
                  
                  <div class="flex flex-col items-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                    <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
                      <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                    <p class="text-gray-600 dark:text-gray-300 text-sm">info&#64;cholobondhu.com</p>
                  </div>
                  
                  <div class="flex flex-col items-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                    <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-3">
                      <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Location</h3>
                    <p class="text-gray-600 dark:text-gray-300 text-sm">Kolkata, West Bengal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Contact Section -->
      <section id="contact-form" class="py-16 bg-gray-50 dark:bg-gray-800">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Contact Form -->
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 fade-in-up">
              <div class="mb-8">
                <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">Send us a Message</h2>
                <p class="text-gray-600 dark:text-gray-300">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </div>

              <!-- Selected Package Info Display -->
              <div *ngIf="selectedPackageInfo" class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                <h3 class="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Selected Package</h3>
                <p class="text-blue-700 dark:text-blue-300">{{ selectedPackageInfo.name }}</p>
                <div class="flex flex-wrap gap-4 mt-2 text-sm text-blue-600 dark:text-blue-400">
                  <span *ngIf="selectedPackageInfo.location">📍 {{ selectedPackageInfo.location }}</span>
                  <span *ngIf="selectedPackageInfo.price">💰 {{ selectedPackageInfo.price }}</span>
                  <span *ngIf="selectedPackageInfo.duration">⏰ {{ selectedPackageInfo.duration }}</span>
                </div>
              </div>

              <!-- Success Message -->
              <div *ngIf="isSubmitted" class="mb-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-700 text-center">
                <div class="text-green-600 dark:text-green-400 text-4xl mb-2">✅</div>
                <h3 class="text-lg font-semibold text-green-800 dark:text-green-200">Message Sent Successfully!</h3>
                <p class="text-green-700 dark:text-green-300">We'll get back to you soon. Redirecting to home page...</p>
              </div>

              <!-- Contact Form -->
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      formControlName="name"
                      class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300 form-input"
                      placeholder="Enter your full name"
                      [class.border-red-500]="getFieldError('name')"
                    />
                    <p *ngIf="getFieldError('name')" class="mt-1 text-sm text-red-500">{{ getFieldError('name') }}</p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      formControlName="email"
                      class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300 form-input"
                      placeholder="Enter your email"
                      [class.border-red-500]="getFieldError('email')"
                    />
                    <p *ngIf="getFieldError('email')" class="mt-1 text-sm text-red-500">{{ getFieldError('email') }}</p>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      formControlName="phone"
                      class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300 form-input"
                      placeholder="+91 12345 67890"
                      [class.border-red-500]="getFieldError('phone')"
                    />
                    <p *ngIf="getFieldError('phone')" class="mt-1 text-sm text-red-500">{{ getFieldError('phone') }}</p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Preferred Destination
                    </label>
                    <select
                      formControlName="destination"
                      class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300 form-input"
                    >
                      <option value="">Select a destination</option>
                      <option value="Darjeeling">Darjeeling</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Sundarbans">Sundarbans</option>
                      <option value="Digha">Digha</option>
                      <option value="Bakkhali">Bakkhali</option>
                      <option value="Goa">Goa</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Ladakh">Ladakh</option>
                      <option value="Andaman">Andaman</option>
                      <option value="Northeast India">Northeast India</option>
                      <option value="South India">South India</option>
                      <option value="Golden Triangle">Golden Triangle</option>
                      <option value="Custom Package">Custom Package</option>
                    </select>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      formControlName="startDate"
                      class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300 form-input"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      formControlName="endDate"
                      class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300 form-input"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Number of Travelers
                    </label>
                    <select
                      formControlName="travelers"
                      class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300 form-input"
                    >
                      <option value="1">1 Traveler</option>
                      <option value="2">2 Travelers</option>
                      <option value="3">3 Travelers</option>
                      <option value="4">4 Travelers</option>
                      <option value="5+">5+ Travelers</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Budget Range
                    </label>
                    <select
                      formControlName="budget"
                      class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300 form-input"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-3k">Under ₹3,000</option>
                      <option value="3k-10k">₹3,000 - ₹10,000</option>
                      <option value="10k-25k">₹10,000 - ₹25,000</option>
                      <option value="25k-50k">₹25,000 - ₹50,000</option>
                      <option value="50k-100k">₹50,000 - ₹1,00,000</option>
                      <option value="above-100k">Above ₹1,00,000</option>
                      <option value="custom">Custom Package</option>
                      <option value="100k-200k">₹1,00,000 - ₹2,00,000</option>
                      <option value="200k-500k">₹2,00,000 - ₹5,00,000</option>
                      <option value="500k+">Above ₹5,00,000</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    formControlName="message"
                    rows="5"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300 form-input resize-none"
                    placeholder="Tell us about your travel plans, preferences, or any specific requirements..."
                    [class.border-red-500]="getFieldError('message')"
                  ></textarea>
                  <p *ngIf="getFieldError('message')" class="mt-1 text-sm text-red-500">{{ getFieldError('message') }}</p>
                </div>

                <button
                  type="submit"
                  [disabled]="!contactForm.valid || isSubmitting"
                  class="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover-glow"
                >
                  <span *ngIf="!isSubmitting" class="flex items-center justify-center">
                    <span>Send Message</span>
                    <span class="ml-2">→</span>
                  </span>
                  <span *ngIf="isSubmitting" class="flex items-center justify-center">
                    <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </span>
                </button>
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
              <!-- Office Location -->
              <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 fade-in-up">
                <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Visit Our Office</h3>
                <div class="space-y-4">
                  <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <span class="text-blue-600 dark:text-blue-400 text-xl">📍</span>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-800 dark:text-white">Address</h4>
                      <p class="text-gray-600 dark:text-gray-300">Bagnan, Howrah<br>Pin: 711303, West Bengal<br>India</p>
                    </div>
                  </div>

                  <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <span class="text-green-600 dark:text-green-400 text-xl">📞</span>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-800 dark:text-white">Phone</h4>
                      <p class="text-gray-600 dark:text-gray-300">+91 81002 82665</p>
                    </div>
                  </div>

                  <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <span class="text-purple-600 dark:text-purple-400 text-xl">✉️</span>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-800 dark:text-white">Email</h4>
                      <p class="text-gray-600 dark:text-gray-300">info&#64;cholobondhu.com<br>support&#64;cholobondhu.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Operating Hours -->
              <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 fade-in-up">
                <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Operating Hours</h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300">Monday - Friday</span>
                    <span class="font-semibold text-gray-800 dark:text-white">9:00 AM - 7:00 PM</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300">Saturday</span>
                    <span class="font-semibold text-gray-800 dark:text-white">10:00 AM - 6:00 PM</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300">Sunday</span>
                    <span class="font-semibold text-gray-800 dark:text-white">Emergency Only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .text-gradient-bright {
      background: linear-gradient(135deg, #ffee00ff 0%, #eeff00ff 25%, #ff5100ff 50%, #e5ff00ff 75%, #ffcc00 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      background-size: 200% 200%;
      animation: shimmer-bright 2s ease-in-out infinite;
      text-shadow: 0 0 30px rgba(0, 245, 255, 0.5);
      filter: brightness(1.5) saturate(1.8);
    }

    .animate-glow {
      animation: mega-glow 3s ease-in-out infinite;
    }

    @keyframes shimmer-bright {
      0%, 100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }

    @keyframes mega-glow {
      0%, 100% {
        text-shadow: 0 0 30px rgba(0, 245, 255, 0.5), 0 0 60px rgba(102, 0, 255, 0.3);
        filter: brightness(1.5) saturate(1.8);
      }
      50% {
        text-shadow: 0 0 45px rgba(0, 245, 255, 0.8), 0 0 90px rgba(102, 0, 255, 0.5), 0 0 120px rgba(255, 0, 128, 0.3);
        filter: brightness(2) saturate(2.2);
      }
    }

    .fade-in-up {
      animation: fadeInUp 1s ease-out;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes scale-x {
      from {
        transform: scaleX(0);
      }
      to {
        transform: scaleX(1);
      }
    }

    .animate-scale-x {
      animation: scale-x 2s ease-out forwards;
    }

    .hover-glow:hover {
      box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
    }

    .form-input:focus {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.2);
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
  `]
})
export class ContactComponent {
  darkMode = false;
  contactForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  showSuccessPopup = false;
  selectedPackageInfo: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private emailService: EmailService,
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

    // Get query parameters if coming from booking
    this.route.queryParams.subscribe(params => {
      if (params['request'] === 'booking') {
        this.selectedPackageInfo = {
          name: params['tour'] || params['package'] || params['destination'],
          location: params['location'],
          price: params['price'],
          duration: params['duration'],
          mood: params['mood'],
          distance: params['distance'],
          category: params['category']
        };

        // Pre-fill the form if we have package info
        if (this.selectedPackageInfo.name) {
          const packageDetails = `I am interested in booking: ${this.selectedPackageInfo.name}`;
          this.contactForm.patchValue({
            message: packageDetails
          });
        }
      }
    });
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
  }

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
