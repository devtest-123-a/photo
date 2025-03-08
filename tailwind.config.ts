
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				romantic: {
					50: '#fdf2f8',
					100: '#fce7f3',
					200: '#fbcfe8',
					300: '#f9a8d4',
					400: '#f472b6',
					500: '#ec4899',
					600: '#db2777',
					700: '#be185d',
					800: '#9d174d',
					900: '#831843',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				'pulse-gentle': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' },
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(10px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				'slide-up': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				'slide-in': {
					from: { opacity: '0', transform: 'translateX(-20px)' },
					to: { opacity: '1', transform: 'translateX(0)' },
				},
				'heart-float': {
					'0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
					'50%': { opacity: '0.8' },
					'100%': { transform: 'translateY(-100vh) rotate(360deg)', opacity: '0' },
				},
				'heart-float-1': {
					'0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
					'10%': { opacity: '0.6' },
					'100%': { transform: 'translateY(-100vh) rotate(360deg)', opacity: '0' },
				},
				'heart-float-2': {
					'0%': { transform: 'translateY(0) rotate(-10deg)', opacity: '0' },
					'15%': { opacity: '0.7' },
					'100%': { transform: 'translateY(-100vh) rotate(340deg)', opacity: '0' },
				},
				'heart-float-3': {
					'0%': { transform: 'translateY(0) rotate(10deg)', opacity: '0' },
					'20%': { opacity: '0.5' },
					'100%': { transform: 'translateY(-100vh) rotate(390deg)', opacity: '0' },
				},
				'heart-float-4': {
					'0%': { transform: 'translateY(0) rotate(-5deg)', opacity: '0' },
					'25%': { opacity: '0.8' },
					'100%': { transform: 'translateY(-100vh) rotate(-380deg)', opacity: '0' },
				},
				'heart-float-5': {
					'0%': { transform: 'translateY(0) rotate(5deg)', opacity: '0' },
					'30%': { opacity: '0.6' },
					'100%': { transform: 'translateY(-100vh) rotate(370deg)', opacity: '0' },
				},
				'scale-in': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-gentle': 'pulse-gentle 3s ease-in-out infinite',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-up': 'slide-up 0.4s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'heart-float-1': 'heart-float-1 15s linear infinite',
				'heart-float-2': 'heart-float-2 18s linear infinite',
				'heart-float-3': 'heart-float-3 20s linear infinite',
				'heart-float-4': 'heart-float-4 22s linear infinite',
				'heart-float-5': 'heart-float-5 25s linear infinite',
				'scale-in': 'scale-in 0.3s ease-out',
			},
			backgroundImage: {
				'romantic-gradient': 'linear-gradient(to right, #fee2e2, #fce7f3)',
			},
			transitionProperty: {
				'transform': 'transform',
				'opacity': 'opacity',
			},
			backdropBlur: {
				xs: '2px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
