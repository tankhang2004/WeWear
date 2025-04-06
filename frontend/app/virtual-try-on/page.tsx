"use client"

import { useState, useRef } from 'react'
import { Camera, RotateCw, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function VirtualTryOn() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedClothing, setSelectedClothing] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const demoClothes = [
    {
      id: '1',
      name: 'Classic White T-Shirt',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '$29.99'
    },
    {
      id: '2',
      name: 'Black Leather Jacket',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '$199.99'
    },
    {
      id: '3',
      name: 'Blue Denim Jacket',
      image: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '$89.99'
    }
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClothingSelect = (clothingId: string) => {
    setSelectedClothing(clothingId)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Virtual Try-On</h1>
          <p className="text-lg text-muted-foreground">
            Experience how clothes look on you before making a purchase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image Upload and Preview */}
          <div>
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="upload">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="upload">Upload Photo</TabsTrigger>
                    <TabsTrigger value="camera">Use Camera</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload">
                    <div className="space-y-4">
                      <div
                        className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="camera">
                    <div className="space-y-4">
                      <div className="border rounded-lg p-8 text-center">
                        <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <Button>Start Camera</Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {selectedImage && (
                  <div className="mt-6">
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                      <img
                        src={selectedImage}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4 w-full"
                      onClick={() => setSelectedImage(null)}
                    >
                      Remove Image
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Clothing Selection and Controls */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tops">Tops</SelectItem>
                        <SelectItem value="jackets">Jackets</SelectItem>
                        <SelectItem value="dresses">Dresses</SelectItem>
                        <SelectItem value="pants">Pants</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Size</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="xs">XS</SelectItem>
                        <SelectItem value="s">S</SelectItem>
                        <SelectItem value="m">M</SelectItem>
                        <SelectItem value="l">L</SelectItem>
                        <SelectItem value="xl">XL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Color</Label>
                    <div className="flex gap-2 mt-2">
                      {['bg-black', 'bg-white', 'bg-red-500', 'bg-blue-500', 'bg-green-500'].map((color) => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full ${color} border-2 border-gray-200 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {demoClothes.map((item) => (
                <div
                  key={item.id}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedClothing === item.id ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => handleClothingSelect(item.id)}
                >
                  <div className="aspect-square relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2 text-center">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button className="flex-1" disabled={!selectedImage || !selectedClothing}>
                Try On
              </Button>
              <Button variant="outline" size="icon">
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}