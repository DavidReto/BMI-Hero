import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'BMI-Hero',
    description: 'Track body fat progress using skinfolds and other methods',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body>{children}</body>
        </html>
    );
}
