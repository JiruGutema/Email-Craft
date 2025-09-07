"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCategories, deleteCategory, getCategories } from "@/lib/category";
import { toast } from "@/hooks/use-toast";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";


export default function CategoriesPage() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [search, setSearch] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [form, setForm] = useState<{ name: string }>({ name: "" });
  const [selectedCategory, setSelectedCategory] = useState<{ id: string; name: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      const res = await getCategories();
      const cats = await res.json();
      setCategories(cats);
    }
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
      await createCategories(form, token);
      setAddDialogOpen(false);
      setForm({ name: "" });
      // Refresh categories
      const res = await getCategories();
      const cats = await res.json();
      setCategories(cats);
    } catch (error) {
      toast({ description: "Failed to create category", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;
    setIsSubmitting(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
      await createCategories({ name: form.name, id: selectedCategory.id }, token);
      setEditDialogOpen(false);
      setForm({ name: "" });
      setSelectedCategory(null);
      // Refresh categories
      const res = await getCategories();
      const cats = await res.json();
      setCategories(cats);
    } catch (error) {
      toast({ description: "Failed to update category", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;
    const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
    await deleteCategory(selectedCategory.id, token);
    setDeleteDialogOpen(false);
    setSelectedCategory(null);
    // Refresh categories
    const res = await getCategories();
    const cats = await res.json();
    setCategories(cats);
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <AdminSidebar />
      <div className="flex-1 p-8 max-w-2xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Categories</h1>
          <Button onClick={() => setAddDialogOpen(true)}>
            Add Category
          </Button>
        </header>
        <div className="mb-6 flex gap-2">
          <Input
            placeholder="Search categories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-sm"
          />
        </div>
        <div className=" grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCategories.map(cat => (
            <Card key={cat.id} className="flex mb-4 items-center justify-between p-4">
              <div>
                <h3 className="font-semibold text-lg">{cat.name}</h3>
                <p className="text-xs text-muted-foreground">ID: {cat.id}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => { setEditDialogOpen(true); setSelectedCategory(cat); setForm({ name: cat.name }); }}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => { setDeleteDialogOpen(true); setSelectedCategory(cat); }}>Delete</Button>
              </div>
            </Card>
          ))}
        </div>
        {/* Add Category Dialog */}
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <Input
                placeholder="Category Name"
                value={form.name}
                onChange={e => setForm({ name: e.target.value })}
                required
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>Create</Button>
            </form>
          </DialogContent>
        </Dialog>
        {/* Edit Category Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditCategory} className="space-y-4">
              <Input
                placeholder="Category Name"
                value={form.name}
                onChange={e => setForm({ name: e.target.value })}
                required
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>Update</Button>
            </form>
          </DialogContent>
        </Dialog>
        {/* Delete Category Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Delete Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>Are you sure you want to delete this category?</p>
              <div className="flex gap-2">
                <Button variant="destructive" className="flex-1" onClick={handleDeleteCategory}>Delete</Button>
                <Button variant="outline" className="flex-1" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

