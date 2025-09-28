'use client';

import Image from "next/image";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Package,
  LayoutDashboard,
  Users,
  ShoppingCart,
  CreditCard,
  X,
  type LucideProps,
} from 'lucide-react';
import type { ComponentType } from 'react';

interface SidebarLink {
  id: number;
  href: string;
  label?: string;
  icon?: ComponentType<LucideProps>;
}

export default function Sidebar() {
  const pathname = usePathname();

  const sidebarLinks: SidebarLink[] = [

    { id: 1, href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 2, href: '/products', label: 'Products', icon: Package },
    { id: 3, href: '/sellerManagement', label: 'Sellers', icon: Users },
    { id: 4, href: '/orders', label: 'Orders', icon: ShoppingCart },
    { id: 5, href: '/payment', label: 'Payments', icon: CreditCard },
    { id: 6, href: '/signin', label: 'Logout', icon: X },
  ];

  return (
    <aside className="flex h-screen w-64 flex-col  bg-[#5D070D] p-6 text-white shadow-lg  ">
      <div className="mb-10 mt-4 flex-col items-center gap-2">
        <Image
          src="/images/logo.png"
          alt="CraftCrest Logo"
          width={72} 
          height={72} 
          className="h-18 ml-16"
        />
        <h1 className="text-3xl mt-5 ml-5 font-bold">
          Craft<span className="text-yellow-400">Crest</span>
        </h1>
      </div>
      <nav className="flex flex-1 flex-col border-t border-white pt-5 gap-6 text-xl">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.id}
              href={link.href}
              className={`flex items-center gap-3 rounded px-4 py-2 ${pathname === link.href
                  ? 'bg-white font-semibold text-[#5D070D]'
                  : 'text-white hover:text-yellow-400'
                } ${link.label === 'Logout' ? 'mt-auto' : ''}`}
            >
              {Icon && (
                <Icon
                  size={25}
                  className={`transition-colors duration-200 ${pathname === link.href
                      ? 'text-[#5D070D]'
                      : 'text-white hover:text-yellow-400'
                    }`}
                />
              )}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
