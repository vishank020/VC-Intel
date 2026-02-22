'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { mockCompanies, mockSignals } from '@/lib/mock-data'; // removed mockEnrichments
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowLeft, Bookmark, Sparkles, ExternalLink, Loader2 } from 'lucide-react';

export default function CompanyProfilePage() {
  const params = useParams();
  const companyId = params.id as string;
  const company = mockCompanies.find((c) => c.id === companyId);
  const signals = mockSignals[companyId] || [];

  const [notes, setNotes] = useState('');
  const [savedToList, setSavedToList] = useState(false);
  const [enriched, setEnriched] = useState<any>(null);
  const [isEnriching, setIsEnriching] = useState(false);
  const [enrichError, setEnrichError] = useState<string | null>(null);
  const [cacheTimestamp, setCacheTimestamp] = useState<string | null>(null);
  const [showEnrichment, setShowEnrichment] = useState(false);

  // Load cached enrichment on mount
  useEffect(() => {
    const cached = localStorage.getItem(`enrich-${companyId}`);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        setEnriched(data);
        setCacheTimestamp(timestamp);
        setShowEnrichment(true);
      } catch (e) {
        console.error('Failed to parse cached enrichment', e);
      }
    }
  }, [companyId]);

  if (!company) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Company not found</h2>
          <Link href="/companies">
            <Button variant="outline">Back to Companies</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleEnrich = async () => {
    if (!company.website) {
      setEnrichError('No website URL available for this company.');
      return;
    }

    setIsEnriching(true);
    setEnrichError(null);

    try {
      const res = await fetch('/api/enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: company.website }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || `HTTP error ${res.status}`);
      }

      const json = await res.json();
      const data = json.enrichment || json; // handle both {enrichment} and direct object

      if (!data || typeof data.summary !== 'string') {
        throw new Error('Invalid enrichment response format');
      }

      const timestamp = new Date().toISOString();
      localStorage.setItem(`enrich-${companyId}`, JSON.stringify({ data, timestamp }));

      setEnriched(data);
      setCacheTimestamp(timestamp);
      setShowEnrichment(true);
    } catch (err: any) {
      console.error('Enrichment failed:', err);
      setEnrichError(err.message || 'Failed to enrich company. Please try again.');
    } finally {
      setIsEnriching(false);
    }
  };

  const handleSaveToList = () => {
    setSavedToList(!savedToList);
    // TODO: in real version → update localStorage lists array
  };

  return (
    <div>
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-30">
        <div className="ml-64 px-8 py-6">
          <Link href="/companies" className="flex items-center gap-2 text-primary hover:underline mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Companies
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{company.name}</h1>
              <p className="text-muted-foreground mt-1">{company.description}</p>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={savedToList ? 'default' : 'outline'} size="sm">
                    <Bookmark className={`h-4 w-4 mr-2 ${savedToList ? 'fill-current' : ''}`} />
                    Save to List
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSaveToList}>
                    {savedToList ? 'Remove from Lists' : 'Add to My Companies'}
                  </DropdownMenuItem>
                  <DropdownMenuItem>Create New List</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={handleEnrich} disabled={isEnriching || !company.website} size="sm">
                {isEnriching ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Enriching...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Enrich
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="ml-64 px-8 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <Card className="p-6 border-border bg-card">
              <h2 className="text-xl font-semibold text-foreground mb-4">Overview</h2>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Industry</p>
                  <p className="font-semibold text-foreground">{company.industry}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Stage</p>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {company.stage}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Founded</p>
                  <p className="font-semibold text-foreground">{company.foundedYear}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="font-semibold text-foreground">{company.location}</p>
                </div>
              </div>
              {company.website && (
                <div className="mt-6 pt-6 border-t border-border">
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    Visit Website
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )}
            </Card>

            {/* Signals Timeline */}
            {signals.length > 0 && (
              <Card className="p-6 border-border bg-card">
                <h2 className="text-xl font-semibold text-foreground mb-4">Signals Timeline</h2>
                <div className="space-y-4">
                  {signals.map((signal) => (
                    <div key={signal.id} className="border-l-2 border-primary pl-4 py-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{signal.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{signal.description}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                          {new Date(signal.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Notes */}
            <Card className="p-6 border-border bg-card">
              <h2 className="text-xl font-semibold text-foreground mb-4">Notes</h2>
              <Textarea
                placeholder="Add your research notes and observations..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-32 bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrichment Section */}
            <Card className="p-6 border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">AI Enrichment</h3>

              {showEnrichment && enriched ? (
                <div className="space-y-6 text-sm">
                  {/* Summary */}
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Summary</p>
                    <p className="leading-relaxed">{enriched.summary}</p>
                  </div>

                  {/* What They Do */}
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">What They Do</p>
                    <ul className="space-y-1 list-disc pl-5">
                      {enriched.whatTheyDo?.map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Keywords */}
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {enriched.keywords?.map((kw: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {kw}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Derived Signals */}
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Derived Signals</p>
                    <ul className="space-y-1 list-disc pl-5">
                      {enriched.derivedSignals?.map((sig: string, idx: number) => (
                        <li key={idx}>{sig}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Sources */}
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Sources</p>
                    <ul className="space-y-1 text-xs">
                      {enriched.sources?.map((src: { url: string; timestamp: string }, idx: number) => (
                        <li key={idx}>
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            {new URL(src.url).hostname} • {new Date(src.timestamp).toLocaleString()}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {cacheTimestamp && (
                    <p className="text-xs text-muted-foreground mt-4">
                      Cached on {new Date(cacheTimestamp).toLocaleString()}
                    </p>
                  )}
                </div>
              ) : (
                <Button
                  onClick={handleEnrich}
                  disabled={isEnriching || !company.website}
                  className="w-full"
                >
                  {isEnriching ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Enriching...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Enrich with live website data
                    </>
                  )}
                </Button>
              )}

              {enrichError && (
                <p className="text-sm text-destructive mt-4">{enrichError}</p>
              )}
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Company Stage</p>
                  <p className="text-lg font-bold text-foreground mt-1">{company.stage}</p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Years Active</p>
                  <p className="text-lg font-bold text-foreground mt-1">
                    {new Date().getFullYear() - company.foundedYear}
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Latest Signals</p>
                  <p className="text-lg font-bold text-foreground mt-1">{signals.length}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}