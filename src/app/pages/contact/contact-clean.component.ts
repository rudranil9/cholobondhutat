import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact-clean',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <!-- Hero Section -->
      <section class="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 mt-16 overflow-hidden">
        <div class="absolute inset-0 bg-black/20"></div>
        
        <!-- Animated background elements -->
        <div class="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-400/15 rounded-full blur-xl animate-bounce delay-500"></div>
        
        <div class="relative z-10 container mx-auto px-4">
          <div class="text-center max-w-4xl mx-auto">
            <h1 class="text-5xl md:text-6xl font-bold mb-6 text-gradient-bright animate-glow">
              Contact Us
            </h1>
            <p class="text-xl md:text-2xl opacity-90 leading-relaxed mb-8">
              Ready to start your next adventure? Get in touch with our travel experts
            </p>
            
            <!-- Quick contact info -->
            <div class="flex flex-wrap justify-center gap-8 text-center">
              <div class="flex items-center space-x-2">
                <span class="text-2xl">📞</span>
                <span class="text-lg font-medium">+91 81002 82665</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-2xl">✉️</span>
                <span class="text-lg font-medium">info&#64;cholobondhu.com</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-2xl">📍</span>
                <span class="text-lg font-medium">Kolkata, West Bengal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Contact Section -->
      <section class="py-16 bg-gray-50 dark:bg-gray-800">
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
                      Preferred Start Date
                    </label>
                    <input
                      type="date"
                      formControlName="startDate"
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
                      <option value="">Select number of travelers</option>
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3-5">3-5 People</option>
                      <option value="6-10">6-10 People</option>
                      <option value="10+">More than 10</option>
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
                  [disabled]="isSubmitting || isSubmitted"
                  class="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover-glow"
                >
                  <span *ngIf="!isSubmitting && !isSubmitted" class="flex items-center justify-center">
                    <span>Send Message</span>
                    <span class="ml-2">→</span>
                  </span>
                  <span *ngIf="isSubmitting" class="flex items-center justify-center">
                    <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </span>
                  <span *ngIf="isSubmitted" class="flex items-center justify-center">
                    ✅ Message Sent!
                  </span>
                </button>
              </form>
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

    .hover-glow:hover {
      box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
    }

    .form-input:focus {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.2);
    }
  `]
})
export class ContactCleanComponent {
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
    private emailService: EmailService
  ) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\d\s\-\+\(\)]+$/)]],
      startDate: [''],
      travelers: [''],
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
        this.isSubmitted = true;
        
        // Reset form after 3 seconds and navigate to home
        setTimeout(() => {
          this.contactForm.reset();
          this.isSubmitted = false;
          this.router.navigate(['/']);
        }, 3000);
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
