'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { RotateCcw, Trash2, ArrowRight } from 'lucide-react';
import { mockCompanies } from '@/lib/mock-data';

interface SavedSearch {
  id: string;
  name: string;
  filters: {
    searchQuery?: string;
    industry?: string;
    stage?: string;
    location?: string;
  };
  results: number;
  createdAt: string;
  lastRun: string;
}

export default function SavedSearchesPage() {
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const [deleteSearchId, setDeleteSearchId] = useState<string | null>(null);

  // Load searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem('vc_searches');
    if (savedSearches) {
      try {
        setSearches(JSON.parse(savedSearches));
      } catch (e) {
        console.error('Failed to parse searches:', e);
      }
    } else {
      // Initialize with some example searches
      const defaultSearches: SavedSearch[] = [
        {
          id: '1',
          name: 'Series B Enterprise SaaS',
          filters: {
            stage: 'Series B',
            industry: 'Enterprise Software',
          },
          results: 3,
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          lastRun: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Seed FinTech Companies',
          filters: {
            stage: 'Seed',
            industry: 'FinTech',
          },
          results: 1,
          createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          lastRun: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '3',
          name: 'Climate Tech in California',
          filters: {
            industry: 'Climate Tech',
            location: 'Palo Alto, CA',
          },
          results: 1,
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          lastRun: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ];
      setSearches(defaultSearches);
      localStorage.setItem('vc_searches', JSON.stringify(defaultSearches));
    }
  }, []);

  const handleDeleteSearch = (id: string) => {
    const updatedSearches = searches.filter((search) => search.id !== id);
    setSearches(updatedSearches);
    localStorage.setItem('vc_searches', JSON.stringify(updatedSearches));
    setDeleteSearchId(null);
  };

  const handleRerunSearch = (search: SavedSearch) => {
    const updatedSearches = searches.map((s) => {
      if (s.id === search.id) {
        return {
          ...s,
          lastRun: new Date().toISOString(),
        };
      }
      return s;
    });
    setSearches(updatedSearches);
    localStorage.setItem('vc_searches', JSON.stringify(updatedSearches));
  };

  const getFilterDescription = (filters: SavedSearch['filters']) => {
    const parts = [];
    if (filters.searchQuery) parts.push(`Query: "${filters.searchQuery}"`);
    if (filters.industry) parts.push(`Industry: ${filters.industry}`);
    if (filters.stage) parts.push(`Stage: ${filters.stage}`);
    if (filters.location) parts.push(`Location: ${filters.location}`);
    return parts.join(' • ');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <>
      <Header
        title="Saved Searches"
        description="Quick access to your frequently used research queries"
      />

      <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        {searches.length === 0 ? (
          <Card className="p-8 sm:p-12 text-center border-border bg-card">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">No saved searches yet</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              Your saved searches will appear here. Use filters on the Companies page to create
              new searches.
            </p>
            <Link href="/companies">
              <Button className="text-sm sm:text-base">
                Go to Companies
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {searches.map((search) => (
              <Card key={search.id} className="border-border bg-card overflow-hidden flex flex-col">
                <div className="p-4 sm:p-6 flex-1">
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground truncate">{search.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Created {formatDate(search.createdAt)}
                      </p>
                    </div>
                    <AlertDialog open={deleteSearchId === search.id} onOpenChange={(open) => {
                      if (!open) setDeleteSearchId(null);
                    }}>
                      <button
                        onClick={() => setDeleteSearchId(search.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <AlertDialogContent className="bg-card border-border">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Search</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{search.name}"? This action cannot be
                            undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="flex gap-2 justify-end">
                          <AlertDialogCancel className="bg-muted border-border">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteSearch(search.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  {/* Filters */}
                  <div className="mb-4 p-3 rounded-lg bg-muted">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {getFilterDescription(search.filters) || 'No filters applied'}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {search.results} results
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Last run {formatDate(search.lastRun)}
                    </Badge>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-border p-6 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-border text-primary hover:bg-primary/10"
                    onClick={() => handleRerunSearch(search)}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Rerun
                  </Button>
                  <Link href="/companies" className="flex-1">
                    <Button variant="default" size="sm" className="w-full">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Usage Tips */}
        <Card className="mt-12 p-6 border-border bg-muted">
          <h3 className="text-lg font-semibold text-foreground mb-3">💡 Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              • Use the Companies page filters to create powerful research queries based on industry,
              stage, location, and keywords
            </li>
            <li>
              • Your saved searches are stored locally in your browser and can be re-run anytime
            </li>
            <li>• Saved searches capture your filter criteria for quick access to key research</li>
            <li>• Delete searches you no longer need to keep your list organized</li>
          </ul>
        </Card>
      </div>
    </>
  );
}
