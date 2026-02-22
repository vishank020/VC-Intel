'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Download, Trash2, X } from 'lucide-react';
import { mockCompanies } from '@/lib/mock-data';

interface ListItem {
  id: string;
  name: string;
  description: string;
  companies: string[];
  createdAt: string;
}

export default function ListsPage() {
  const [lists, setLists] = useState<ListItem[]>([]);
  const [newListName, setNewListName] = useState('');
  const [newListDescription, setNewListDescription] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteListId, setDeleteListId] = useState<string | null>(null);
  const [expandedList, setExpandedList] = useState<string | null>(null);
  const [selectedCompanies, setSelectedCompanies] = useState<Record<string, string[]>>({});

  // Load lists from localStorage
  useEffect(() => {
    const savedLists = localStorage.getItem('vc_lists');
    if (savedLists) {
      try {
        setLists(JSON.parse(savedLists));
      } catch (e) {
        console.error('Failed to parse lists:', e);
      }
    }
  }, []);

  // Save lists to localStorage
  useEffect(() => {
    if (lists.length > 0) {
      localStorage.setItem('vc_lists', JSON.stringify(lists));
    }
  }, [lists]);

  const handleCreateList = () => {
    if (!newListName.trim()) return;

    const newList: ListItem = {
      id: Date.now().toString(),
      name: newListName,
      description: newListDescription,
      companies: [],
      createdAt: new Date().toISOString(),
    };

    setLists([...lists, newList]);
    setNewListName('');
    setNewListDescription('');
    setIsDialogOpen(false);
  };

  const handleDeleteList = (id: string) => {
    setLists(lists.filter((list) => list.id !== id));
    setDeleteListId(null);
  };

  const handleAddCompanyToList = (listId: string, companyId: string) => {
    setLists(
      lists.map((list) => {
        if (list.id === listId) {
          if (list.companies.includes(companyId)) {
            return {
              ...list,
              companies: list.companies.filter((id) => id !== companyId),
            };
          } else {
            return {
              ...list,
              companies: [...list.companies, companyId],
            };
          }
        }
        return list;
      })
    );
  };

  const handleExport = (list: ListItem, format: 'csv' | 'json') => {
    const companies = list.companies
      .map((id) => mockCompanies.find((c) => c.id === id))
      .filter(Boolean);

    let content: string;
    let filename: string;

    if (format === 'csv') {
      const headers = ['Name', 'Description', 'Industry', 'Stage', 'Location', 'Website'];
      const rows = companies.map((c) => [
        c?.name,
        c?.description,
        c?.industry,
        c?.stage,
        c?.location,
        c?.website || '',
      ]);

      content = [
        headers.join(','),
        ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
      ].join('\n');
      filename = `${list.name}-companies.csv`;
    } else {
      content = JSON.stringify(
        {
          listName: list.name,
          listDescription: list.description,
          exportedAt: new Date().toISOString(),
          companies,
        },
        null,
        2
      );
      filename = `${list.name}-companies.json`;
    }

    const blob = new Blob([content], {
      type: format === 'csv' ? 'text/csv' : 'application/json',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <>
      <Header title="Lists" description="Organize and manage your company collections" />

      <div className="px-8 py-8">
        {/* Create List Button */}
        <div className="mb-8">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create New List
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle>Create New List</DialogTitle>
                <DialogDescription>
                  Create a new list to organize and manage companies
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    List Name
                  </label>
                  <Input
                    placeholder="e.g., Series A Companies, Enterprise SaaS"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    className="bg-input border-border"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Description (optional)
                  </label>
                  <Input
                    placeholder="Add a description for this list"
                    value={newListDescription}
                    onChange={(e) => setNewListDescription(e.target.value)}
                    className="bg-input border-border"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateList} disabled={!newListName.trim()}>
                    Create List
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Lists Grid */}
        {lists.length === 0 ? (
          <Card className="p-12 text-center border-border bg-card">
            <h3 className="text-xl font-semibold text-foreground mb-2">No lists yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first list to start organizing companies
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create List
                </Button>
              </DialogTrigger>
            </Dialog>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lists.map((list) => (
              <Card key={list.id} className="border-border bg-card flex flex-col">
                <div className="p-6 border-b border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{list.name}</h3>
                      {list.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {list.description}
                        </p>
                      )}
                    </div>
                    <AlertDialog open={deleteListId === list.id} onOpenChange={(open) => {
                      if (!open) setDeleteListId(null);
                    }}>
                      <button
                        onClick={() => setDeleteListId(list.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <AlertDialogContent className="bg-card border-border">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete List</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{list.name}"? This action cannot be
                            undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="flex gap-2 justify-end">
                          <AlertDialogCancel className="bg-muted border-border">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteList(list.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <Badge variant="secondary">{list.companies.length} companies</Badge>
                </div>

                {/* Companies List */}
                <div className="flex-1 p-6 space-y-3">
                  {list.companies.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No companies added yet
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {list.companies.map((companyId) => {
                        const company = mockCompanies.find((c) => c.id === companyId);
                        if (!company) return null;
                        return (
                          <div
                            key={companyId}
                            className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted"
                          >
                            <span className="text-foreground font-medium">{company.name}</span>
                            <button
                              onClick={() => handleAddCompanyToList(list.id, companyId)}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="border-t border-border p-6 space-y-2">
                  <button
                    onClick={() =>
                      setExpandedList(expandedList === list.id ? null : list.id)
                    }
                    className="w-full py-2 px-3 rounded-lg bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-colors"
                  >
                    {expandedList === list.id ? 'Hide' : 'Add'} Companies
                  </button>

                  {list.companies.length > 0 && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-border text-primary hover:bg-primary/10"
                        onClick={() => handleExport(list, 'csv')}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        CSV
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-border text-primary hover:bg-primary/10"
                        onClick={() => handleExport(list, 'json')}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        JSON
                      </Button>
                    </div>
                  )}
                </div>

                {/* Expanded Company Selection */}
                {expandedList === list.id && (
                  <div className="border-t border-border p-6 space-y-2 max-h-64 overflow-y-auto">
                    {mockCompanies.map((company) => (
                      <button
                        key={company.id}
                        onClick={() => handleAddCompanyToList(list.id, company.id)}
                        className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                          list.companies.includes(company.id)
                            ? 'bg-primary/20 text-primary border border-primary'
                            : 'bg-muted text-foreground hover:bg-muted/80'
                        }`}
                      >
                        {company.name}
                      </button>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
