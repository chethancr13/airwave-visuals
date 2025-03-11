
import * as React from "react"
import { Heart, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-gray-800 bg-black text-white shadow-lg shadow-purple-900/10 hover:shadow-purple-800/20 transition-all duration-300 hover:translate-y-[-5px]",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-white",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-400", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

const ProductCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    imageSrc: string;
    price: string;
    name: string;
    category?: string;
    badge?: string;
  }
>(({ className, imageSrc, price, name, category, badge, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "group rounded-xl overflow-hidden bg-black border border-gray-800 shadow-lg hover:shadow-purple-800/20 transition-all duration-300 hover:scale-[1.02]",
      className
    )}
    {...props}
  >
    <div className="relative overflow-hidden">
      {badge && (
        <div className="absolute top-2 left-2 z-10 bg-primary text-xs text-white font-medium px-2 py-1 rounded">
          {badge}
        </div>
      )}
      <div className="relative pt-[100%] overflow-hidden bg-gradient-to-b from-gray-900 to-black">
        <img
          src={imageSrc}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex justify-center space-x-2">
          <button className="rounded-full bg-white p-2 hover:bg-primary transition-colors">
            <Heart className="h-4 w-4 text-black" />
          </button>
          <button className="rounded-full bg-white p-2 hover:bg-primary transition-colors">
            <ShoppingCart className="h-4 w-4 text-black" />
          </button>
        </div>
      </div>
    </div>
    <div className="p-4">
      {category && (
        <span className="text-xs text-gray-400">{category}</span>
      )}
      <h3 className="mt-1 text-white font-medium">{name}</h3>
      <div className="mt-1 flex justify-between items-center">
        <span className="font-semibold text-primary">{price}</span>
        <div className="flex items-center space-x-1">
          <span className="text-yellow-500">★★★★</span><span className="text-gray-400">★</span>
        </div>
      </div>
    </div>
  </div>
))
ProductCard.displayName = "ProductCard"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, ProductCard }
