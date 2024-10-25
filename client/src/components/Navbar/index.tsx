import React, { useState } from 'react'
import {LucideLogOut, Menu, Moon, Settings, Sun, User} from "lucide-react"
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/state'
import Search from '../search';
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'

const Navbar = () => {
  const { setTheme } = useTheme()
  const dispatch = useAppDispatch();
  const [imageError, setImageError] = useState<boolean>(false);
  const isSidebarCollapsed = useAppSelector((state)=> state.global.isSidebarCollapsed);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const { user, isLoading } = useAuth(true);

  const handleSignOut =  async () => {
    try{
      signOut({ callbackUrl: '/' })
    }catch (error: any){
      console.error("Error signing out", error);  
    }
  };

  if(!user) return null;


  return (
    <div className="w-full flex items-center justify-between bg-white dark:bg-gray-950 px-4 py-3">
      <div className="flex items-center gap-8">
      {!isSidebarCollapsed ? null : (
        <button onClick={()=> dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
          <Menu className='h-6 w-6 dark:text-white'/>
        </button> )}
      </div>
      <div className="relative flex h-min w-full md:w-1/2">
        <Search/>
      </div>

      <div className='flex items-center'>
        <ThemeToggle setTheme={setTheme}/>
       
        <div className='ml-2 mr-5 hidden min-h-[2rem] w-[0.1rem] bg-gray-200 md:inline-block'></div>
        <div className='hidden items-center justify-between md:flex'>
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
            <div className='align-center flex h-9 w-9 justify-center'>
            {!!user?.image && !imageError ? (
              <Image
                src={`https://proto-pm-s3-images.s3.ap-south-1.amazonaws.com/${user?.image}`}
                alt={user?.image || "User profile"}
                width={100}
                height={100}
                className="h-full object-cover rounded-full"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
                <User className="h-6 w-6 text-white" />
              </div>
            )}
            </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem >
              <span className='flex items-center gap-2 p-2'>
                <Link 
                  className={ `flex gap-2 items-center h-min w-min rounded ${isDarkMode ? 'dark:hover:bg-gray-700' : 'hover:bg-gray-100'} `}
                  href='/settings'>
                  <Settings className='size-5 cursor-pointer dark:text-white'/>
                  <p>Settings</p>
                </Link>
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              <span className='cursor-pointer flex items-center gap-2 p-2 mt-2 hover:text-red-500'>
                <LucideLogOut className='size-5'/> 
                <p className=''>Sign Out</p>
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          <span className='mx-3 text-gray-800 dark:text-white'>{user?.name}</span>
        </div>
      </div>
    </div>
  )
};


type ThemeProps = {
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

const ThemeToggle = ({setTheme}: ThemeProps) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
  )
};


export default Navbar;

