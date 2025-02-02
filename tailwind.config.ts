/** @type {import('tailwindcss').Config} */

const config = {
	darkMode: ["class"],
	content: [
		// "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		// "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		// "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			backgroundColor: {
				primary: '#4B5945',
				"primary-hover": "#66785F",
				secondary: '#91AC8F',
				"secondary-hover": "#B2C9AD",
				background: '#E9EED9',
				foreground: '#CBD2A4',
			},
			colors: {
				'primary': '#4B5945',
				"primary-hover": "#66785F",
				secondary: '#91AC8F',
				"secondary-hover": "#B2C9AD",
				third: '#CCFBF1',
				'third-hover': '#F0FDFA',
				'danger': '#FF1D48',
				'danger-hover': '#F43F5E',
				background: '#E2DBD0',
				foreground: 'FFFDF5',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			textColor: {
				'primary': '#052E16',
				'secondary': '#2E2E2E',
				'lightGreen': '#BBF7D0',
				'lightWhite': '#F1F5F9'
			},
			fontFamily: {
				header: ['var(--font-catamaran)'],
				title: ['var(--font-nunito-sans)'],
				paragraf: ['var(--font-roboto)']
			},
			borderColor: {
				'primary': '#052E16',
				'secondary': '#2E2E2E',
				'lightGreen': '#BBF7D0',
				'lightWhite': '#F1F5F9',
				third: '#CCFBF1',
				'third-hover': '#F0FDFA',
				'danger': '#FF1D48',
				'danger-hover': '#F43F5E',
			},
			borderRadius: {
				'5xl': '3rem'
			  }
		}
	},
	plugins: [require("tailwindcss-animate")],
}

export default config;
