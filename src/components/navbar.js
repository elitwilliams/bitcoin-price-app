// components/Navbar.js
import Link from 'next/link';

function Navbar() {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto">
                <Link href="/">
                    <a className="mr-6">Home</a>
                </Link>
                <Link href="/chart">
                    <a>Chart</a>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
