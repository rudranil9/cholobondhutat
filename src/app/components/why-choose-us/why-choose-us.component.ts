import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Cholo Bondhu?
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            With years of experience and thousands of happy travelers, we're your trusted partner for unforgettable journeys
          </p>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div *ngFor="let feature of features; let i = index" 
               class="text-center group premium-feature-card"
               [style.animation-delay]="(i * 0.2) + 's'">
            <div class="relative w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl group-hover:scale-110 transition-all duration-500 shadow-xl hover:shadow-2xl float-gentle glow-effect">
              <div class="absolute -inset-2 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-pulse"></div>
              <span class="relative z-10">{{ feature.icon }}</span>
              <div class="absolute inset-0 rounded-full bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 mb-16">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div *ngFor="let stat of stats" class="group">
              <div class="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                {{ stat.value }}
              </div>
              <div class="text-gray-600 dark:text-gray-300 font-medium">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>

        <!-- Testimonials -->
        <div class="mb-16">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            What Our Travelers Say
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div *ngFor="let testimonial of testimonials" 
                 class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <!-- Rating -->
              <div class="flex items-center mb-4">
                <div class="flex text-yellow-400 mr-2">
                  <span *ngFor="let star of getStars(testimonial.rating)">⭐</span>
                </div>
                <span class="text-gray-600 dark:text-gray-300 text-sm">
                  {{ testimonial.rating }}/5
                </span>
              </div>
              
              <!-- Testimonial Text -->
              <p class="text-gray-700 dark:text-gray-300 mb-4 italic">
                "{{ testimonial.text }}"
              </p>
              
              <!-- Author -->
              <div class="flex items-center">
                <img [src]="testimonial.avatar" 
                     [alt]="testimonial.name"
                     class="w-12 h-12 rounded-full mr-4 object-cover">
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white">
                    {{ testimonial.name }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ testimonial.location }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Trust Badges -->
        <div class="text-center">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-8">
            Trusted & Certified
          </h3>
          <div class="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div *ngFor="let badge of trustBadges" 
                 class="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <span class="text-2xl">{{ badge.icon }}</span>
              <span class="font-medium">{{ badge.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hover\\:shadow-xl:hover {
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    .premium-feature-card {
      animation: fadeInUp 0.6s ease-out forwards;
      opacity: 0;
      transform: translateY(30px);
    }

    .float-gentle {
      animation: float-gentle 6s ease-in-out infinite;
    }

    .glow-effect {
      position: relative;
    }

    .glow-effect::before {
      content: '';
      position: absolute;
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
      background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #667eea);
      border-radius: 50%;
      z-index: -1;
      filter: blur(10px);
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    .group:hover .glow-effect::before {
      opacity: 0.6;
      animation: rotate-rainbow 3s linear infinite;
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

    @keyframes float-gentle {
      0%, 100% {
        transform: translateY(0px);
      }
      33% {
        transform: translateY(-8px);
      }
      66% {
        transform: translateY(4px);
      }
    }

    @keyframes rotate-rainbow {
      0% {
        transform: rotate(0deg);
        filter: blur(10px) hue-rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
        filter: blur(10px) hue-rotate(360deg);
      }
    }

    /* Stats counter animations */
    .stats-counter {
      animation: countUp 2s ease-out;
    }

    @keyframes countUp {
      from {
        opacity: 0;
        transform: scale(0.5);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    /* Enhanced hover effects */
    .group:hover h3 {
      text-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
    }

    /* Staggered animation delays */
    .premium-feature-card:nth-child(1) { animation-delay: 0.1s; }
    .premium-feature-card:nth-child(2) { animation-delay: 0.3s; }
    .premium-feature-card:nth-child(3) { animation-delay: 0.5s; }
    .premium-feature-card:nth-child(4) { animation-delay: 0.7s; }
    .premium-feature-card:nth-child(5) { animation-delay: 0.9s; }
    .premium-feature-card:nth-child(6) { animation-delay: 1.1s; }
  `]
})
export class WhyChooseUsComponent {
  features = [
    {
      icon: "🎯",
      title: "Expert Planning",
      description: "Our experienced travel experts craft personalized itineraries that match your interests and budget perfectly."
    },
    {
      icon: "🛡️",
      title: "Safe & Secure",
      description: "Your safety is our priority. We ensure secure bookings, trusted accommodations, and 24/7 support during your journey."
    },
    {
      icon: "💰",
      title: "Best Prices",
      description: "Get the best value for your money with our competitive pricing, transparent costs, and no hidden fees."
    },
    {
      icon: "🏆",
      title: "Award Winning",
      description: "Recognized for excellence in service with multiple travel industry awards and certifications."
    },
    {
      icon: "🌟",
      title: "Local Expertise",
      description: "Deep local knowledge and connections ensure authentic experiences and insider access to hidden gems."
    },
    {
      icon: "📞",
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you before, during, and after your travels."
    }
  ];

  stats = [
    { value: "10,000+", label: "Happy Travelers" },
    { value: "500+", label: "Destinations" },
    { value: "15+", label: "Years Experience" },
    { value: "4.9", label: "Average Rating" }
  ];

  testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai, India",
      rating: 5,
      text: "Amazing experience with Cholo Bondhu! The Golden Triangle tour was perfectly organized. Every detail was taken care of, and our guide was incredibly knowledgeable.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi, India",
      rating: 5,
      text: "The Kerala backwater cruise exceeded all expectations. The houseboat was beautiful, food was delicious, and the entire team was very professional.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      name: "Anita Desai",
      location: "Bangalore, India",
      rating: 5,
      text: "Fantastic Goa vacation! Great hotel recommendations, smooth transfers, and excellent customer service. Will definitely book again with Cholo Bondhu.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  ];

  trustBadges = [
    { icon: "✅", name: "IATA Certified" },
    { icon: "🏆", name: "Tourism Award 2024" },
    { icon: "🔒", name: "SSL Secured" },
    { icon: "💳", name: "Secure Payments" },
    { icon: "📱", name: "24/7 Support" }
  ];

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
