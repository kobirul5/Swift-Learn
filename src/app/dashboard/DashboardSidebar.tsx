import Image from 'next/image';
import Link from 'next/link';
import { FiHome, FiBook, FiUsers, FiSettings } from 'react-icons/fi';

interface NavItem {
    name: string;
    href: string;
    icon: React.ReactNode;
}

const navItems: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: <FiHome /> },
    { name: 'Courses', href: '/dashboard/courses', icon: <FiBook /> },
    { name: 'Students', href: '/dashboard/students', icon: <FiUsers /> },
    { name: 'Settings', href: '/dashboard/settings', icon: <FiSettings /> },
];

export default function DashboardSidebar() {
    
    return (
        <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64 border-r border-dark-200 bg-white">
                <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    {/* Logo */}
                    <div className="flex items-center flex-shrink-0 px-4">
                        <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
                            <Image src="/logo/logo.png" alt="logo" width={30} height={30} />
                            SwiftLearn
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="mt-5 flex-1 px-2 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-dark-600 hover:bg-dark-50 hover:text-dark-900"
                            >
                                <span className="mr-3 text-lg">{item.icon}</span>
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* User Profile */}
                <div className="flex-shrink-0 flex border-t border-dark-200 p-4">
                    <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-primary-600 font-medium">
                                    <Image src="/logo/logo.png" alt="logo" width={30} height={30} />
                            </span>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-dark-700">User Name</p>
                            <p className="text-xs font-medium text-dark-500">View profile</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}