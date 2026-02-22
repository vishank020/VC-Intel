'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { mockCompanies, Company } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown } from 'lucide-react';

type SortField = 'name' | 'foundedYear' | 'location';
type SortOrder = 'asc' | 'desc';

export default function CompaniesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
    const [selectedStage, setSelectedStage] = useState<string>('all');
    const [selectedLocation, setSelectedLocation] = useState<string>('all');
    const [sortField, setSortField] = useState<SortField>('name');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const industries = Array.from(new Set(mockCompanies.map((c) => c.industry)));
    const stages = Array.from(new Set(mockCompanies.map((c) => c.stage)));
    const locations = Array.from(new Set(mockCompanies.map((c) => c.location)));

    const filteredAndSorted = useMemo(() => {
        let filtered = mockCompanies.filter((company) => {
            const matchesSearch =
                company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                company.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesIndustry =
                selectedIndustry === 'all' || company.industry === selectedIndustry;

            const matchesStage =
                selectedStage === 'all' || company.stage === selectedStage;

            const matchesLocation =
                selectedLocation === 'all' || company.location === selectedLocation;


            return matchesSearch && matchesIndustry && matchesStage && matchesLocation;
        });

        filtered.sort((a, b) => {
            let aValue: string | number = a[sortField];
            let bValue: string | number = b[sortField];

            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = (bValue as string).toLowerCase();
            }

            if (sortOrder === 'asc') {
                return aValue < bValue ? -1 : 1;
            } else {
                return aValue > bValue ? -1 : 1;
            }
        });

        return filtered;
    }, [searchQuery, selectedIndustry, selectedStage, selectedLocation, sortField, sortOrder]);

    const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);
    const paginatedData = filteredAndSorted.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const toggleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const getStageBadgeColor = (stage: string) => {
        switch (stage) {
            case 'Seed':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'Series A':
                return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200';
            case 'Series B':
                return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200';
            case 'Series C':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    return (
        <>
            <Header title="Companies" description="Explore and research investment opportunities" />

            <div className="px-8 py-8 space-y-6">
                {/* Filters */}
                <div className="bg-card rounded-lg border border-border p-6 space-y-4">
                    <h3 className="font-semibold text-foreground">Filters</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div>
                            <label className="text-sm font-medium text-foreground block mb-2">
                                Industry
                            </label>
                            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                                <SelectTrigger className="bg-input border-border">
                                    <SelectValue placeholder="All industries" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All industries</SelectItem>
                                    {industries.map((industry) => (
                                        <SelectItem key={industry} value={industry}>
                                            {industry}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground block mb-2">
                                Stage
                            </label>
                            <Select value={selectedStage} onValueChange={setSelectedStage}>
                                <SelectTrigger className="bg-input border-border">
                                    <SelectValue placeholder="All stages" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All stages</SelectItem>
                                    {stages.map((stage) => (
                                        <SelectItem key={stage} value={stage}>
                                            {stage}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground block mb-2">
                                Location
                            </label>
                            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                                <SelectTrigger className="bg-input border-border">
                                    <SelectValue placeholder="All locations" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All locations</SelectItem>
                                    {locations.map((location) => (
                                        <SelectItem key={location} value={location}>
                                            {location}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground block mb-2">
                                Search
                            </label>
                            <Input
                                placeholder="Company name or keyword"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="bg-input border-border"
                            />
                        </div>
                    </div>
                </div>

                {/* Results Info */}
                <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        Showing {paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–
                        {Math.min(currentPage * itemsPerPage, filteredAndSorted.length)} of{' '}
                        {filteredAndSorted.length} companies
                    </p>
                </div>

                {/* Table */}
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b border-border hover:bg-transparent">
                                <TableHead className="text-foreground cursor-pointer" onClick={() => toggleSort('name')}>
                                    <div className="flex items-center gap-2">
                                        Company
                                        <ArrowUpDown className="h-4 w-4" />
                                    </div>
                                </TableHead>
                                <TableHead className="text-foreground">Industry</TableHead>
                                <TableHead className="text-foreground">Stage</TableHead>
                                <TableHead className="text-foreground cursor-pointer" onClick={() => toggleSort('foundedYear')}>
                                    <div className="flex items-center gap-2">
                                        Founded
                                        <ArrowUpDown className="h-4 w-4" />
                                    </div>
                                </TableHead>
                                <TableHead className="text-foreground cursor-pointer" onClick={() => toggleSort('location')}>
                                    <div className="flex items-center gap-2">
                                        Location
                                        <ArrowUpDown className="h-4 w-4" />
                                    </div>
                                </TableHead>
                                <TableHead className="text-foreground text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((company) => (
                                    <TableRow key={company.id} className="border-b border-border hover:bg-muted">
                                        <TableCell className="font-medium text-foreground">
                                            <div>
                                                <p className="font-semibold">{company.name}</p>
                                                <p className="text-sm text-muted-foreground">{company.description}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-foreground text-sm">{company.industry}</TableCell>
                                        <TableCell>
                                            <Badge className={getStageBadgeColor(company.stage)}>
                                                {company.stage}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-foreground text-sm">{company.foundedYear}</TableCell>
                                        <TableCell className="text-foreground text-sm">{company.location}</TableCell>
                                        <TableCell className="text-right">
                                            <Link href={`/companies/${company.id}`}>
                                                <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                                                    View
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        No companies found matching your filters.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                            Page {currentPage} of {totalPages}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
