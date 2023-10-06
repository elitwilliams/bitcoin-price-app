import Link from 'next/link';

function Navbar() {
    return (
        <nav className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between">
                <div className="flex space-x-4">
                    <Link href="/"><span className="cursor-pointer hover:text-gray-400">Home</span></Link>
                    <Link href="/chart"><span className="cursor-pointer hover:text-gray-400">Chart</span></Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
