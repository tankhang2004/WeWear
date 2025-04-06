"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function MenPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Men&apos;s Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <p>Content coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}