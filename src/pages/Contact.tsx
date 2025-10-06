import React, { useState, useMemo } from 'react';
import { Upload, Search, Filter, ArrowUpDown, TrendingUp, TrendingDown, Target, Building2 } from 'lucide-react';
import * as XLSX from 'xlsx';

interface Grant {
  'Programme': string;
  'Key Action': string;
  'Action Type': string;
  'Funding Year': string;
  'Project Identifier': string;
  'Project Title': string;
  'Project Summary': string;
  'Topics': string;
  'Results Platform Project Card': string;
  'Coordinating organisation name': string;
  "Coordinator's country": string;
  'Participating Countries': string;
  'EU Grant award in euros (This amount represents the grant awarded after the selection stage and is indicative. Please note that any changes made during or after the project\'s lifetime will not be reflected here.)': number;
  'Is Good Practice': string;
}

type SortField = keyof Grant;
type SortDirection = 'asc' | 'desc' | null;

const DANISH_RECOMMENDED_ACTION_TYPES = [
  {
    name: "Cooperation partnerships in adult education",
    reason: "Perfect for B2B/corporate wellness platforms",
    avgGrant: "€150-250K",
    timeline: "24-36 months",
    priority: "HIGH"
  },
  {
    name: "Cooperation partnerships in higher education",
    reason: "Large grants for comprehensive platform development",
    avgGrant: "€250-400K",
    timeline: "24-36 months",
    priority: "HIGH"
  },
  {
    name: "Small-scale partnerships in adult education",
    reason: "Fast pilot funding, lower barriers to entry",
    avgGrant: "€30-60K",
    timeline: "6-24 months",
    priority: "MEDIUM"
  },
  {
    name: "Cooperation partnerships in vocational education and training",
    reason: "Excellent for professional skills development features",
    avgGrant: "€150-300K",
    timeline: "24-36 months",
    priority: "HIGH"
  },
  {
    name: "Small-scale partnerships in youth",
    reason: "Good for peer learning network validation",
    avgGrant: "€30-60K",
    timeline: "6-24 months",
    priority: "MEDIUM"
  }
];

export default function ErasmusGrantsDashboard() {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedActionType, setSelectedActionType] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [minGrant, setMinGrant] = useState<string>('');
  const [maxGrant, setMaxGrant] = useState<string>('');
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [showDanishRecommendations, setShowDanishRecommendations] = useState(true);
  const [viewMode, setViewMode] = useState<'all' | 'danish' | 'recommended'>('all');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { cellDates: true });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json<Grant>(worksheet);
    
    setGrants(prev => [...prev, ...jsonData]);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc');
      if (sortDirection === 'desc') setSortField(null);
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const recommendedActionTypeNames = DANISH_RECOMMENDED_ACTION_TYPES.map(t => t.name);

  const filteredAndSortedGrants = useMemo(() => {
    let filtered = grants.filter(grant => {
      const matchesSearch = 
        grant['Project Title']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grant['Project Summary']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grant['Topics']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grant['Coordinating organisation name']?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCountry = !selectedCountry || grant["Coordinator's country"] === selectedCountry;
      const matchesActionType = !selectedActionType || grant['Action Type'] === selectedActionType;
      const matchesYear = !selectedYear || grant['Funding Year'] === selectedYear;
      
      const grantAmount = grant['EU Grant award in euros (This amount represents the grant awarded after the selection stage and is indicative. Please note that any changes made during or after the project\'s lifetime will not be reflected here.)'];
      const matchesMinGrant = !minGrant || grantAmount >= parseFloat(minGrant);
      const matchesMaxGrant = !maxGrant || grantAmount <= parseFloat(maxGrant);

      const baseMatch = matchesSearch && matchesCountry && matchesActionType && matchesYear && matchesMinGrant && matchesMaxGrant;

      if (viewMode === 'danish') {
        return baseMatch && grant["Coordinator's country"] === 'DK';
      }
      if (viewMode === 'recommended') {
        return baseMatch && recommendedActionTypeNames.includes(grant['Action Type']);
      }
      return baseMatch;
    });

    if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        const aStr = String(aVal || '');
        const bStr = String(bVal || '');
        return sortDirection === 'asc' 
          ? aStr.localeCompare(bStr)
          : bStr.localeCompare(aStr);
      });
    }

    return filtered;
  }, [grants, searchTerm, selectedCountry, selectedActionType, selectedYear, minGrant, maxGrant, sortField, sortDirection, viewMode]);

  const countries = useMemo(() => 
    Array.from(new Set(grants.map(g => g["Coordinator's country"]))).filter(Boolean).sort(),
    [grants]
  );

  const actionTypes = useMemo(() => 
    Array.from(new Set(grants.map(g => g['Action Type']))).filter(Boolean).sort(),
    [grants]
  );

  const years = useMemo(() => 
    Array.from(new Set(grants.map(g => g['Funding Year']))).filter(Boolean).sort().reverse(),
    [grants]
  );

  const stats = useMemo(() => {
    const total = filteredAndSortedGrants.reduce((sum, g) => 
      sum + (g['EU Grant award in euros (This amount represents the grant awarded after the selection stage and is indicative. Please note that any changes made during or after the project\'s lifetime will not be reflected here.)'] || 0), 0
    );
    const avg = filteredAndSortedGrants.length > 0 ? total / filteredAndSortedGrants.length : 0;
    const max = Math.max(...filteredAndSortedGrants.map(g => 
      g['EU Grant award in euros (This amount represents the grant awarded after the selection stage and is indicative. Please note that any changes made during or after the project\'s lifetime will not be reflected here.)'] || 0
    ));
    
    const danishGrants = grants.filter(g => g["Coordinator's country"] === 'DK');
    const recommendedTypeGrants = grants.filter(g => recommendedActionTypeNames.includes(g['Action Type']));
    
    return { 
      total, 
      avg, 
      max, 
      count: filteredAndSortedGrants.length,
      danishCount: danishGrants.length,
      recommendedCount: recommendedTypeGrants.length
    };
  }, [filteredAndSortedGrants, grants]);

  const actionTypeAnalysis = useMemo(() => {
    const analysis = new Map<string, {
      count: number;
      totalFunding: number;
      avgFunding: number;
      danishCoordinators: string[];
      isRecommended: boolean;
    }>();

    grants.forEach(grant => {
      const actionType = grant['Action Type'];
      if (!actionType) return;

      const existing = analysis.get(actionType) || {
        count: 0,
        totalFunding: 0,
        avgFunding: 0,
        danishCoordinators: [],
        isRecommended: recommendedActionTypeNames.includes(actionType)
      };

      existing.count++;
      existing.totalFunding += grant['EU Grant award in euros (This amount represents the grant awarded after the selection stage and is indicative. Please note that any changes made during or after the project\'s lifetime will not be reflected here.)'] || 0;
      
      if (grant["Coordinator's country"] === 'DK') {
        existing.danishCoordinators.push(grant['Coordinating organisation name']);
      }

      analysis.set(actionType, existing);
    });

    analysis.forEach((value, key) => {
      value.avgFunding = value.totalFunding / value.count;
      value.danishCoordinators = Array.from(new Set(value.danishCoordinators));
    });

    return Array.from(analysis.entries())
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => {
        if (a.isRecommended && !b.isRecommended) return -1;
        if (!a.isRecommended && b.isRecommended) return 1;
        return b.avgFunding - a.avgFunding;
      });
  }, [grants]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 ml-1 inline opacity-30" />;
    return sortDirection === 'asc' 
      ? <TrendingUp className="w-4 h-4 ml-1 inline text-blue-500" />
      : <TrendingDown className="w-4 h-4 ml-1 inline text-blue-500" />;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCountry('');
    setSelectedActionType('');
    setSelectedYear('');
    setMinGrant('');
    setMaxGrant('');
    setSortField(null);
    setSortDirection(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Erasmus+ Grants Dashboard</h1>
          
          <div className="mb-6">
            <label className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
              <Upload className="w-6 h-6 mr-2 text-gray-500" />
              <span className="text-gray-600">Upload Excel File (.xls, .xlsx)</span>
              <input
                type="file"
                accept=".xls,.xlsx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {grants.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                  <div className="text-sm opacity-90">Total Projects</div>
                  <div className="text-3xl font-bold">{stats.count}</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
                  <div className="text-sm opacity-90">Total Funding</div>
                  <div className="text-2xl font-bold">€{(stats.total / 1000000).toFixed(2)}M</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                  <div className="text-sm opacity-90">Danish Projects</div>
                  <div className="text-3xl font-bold">{stats.danishCount}</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white">
                  <div className="text-sm opacity-90">Recommended Types</div>
                  <div className="text-3xl font-bold">{stats.recommendedCount}</div>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setViewMode('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'all' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All Projects
                </button>
                <button
                  onClick={() => setViewMode('danish')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'danish' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Danish Only
                </button>
                <button
                  onClick={() => setViewMode('recommended')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'recommended' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Recommended Types
                </button>
              </div>
            </>
          )}
        </div>

        {grants.length > 0 && showDanishRecommendations && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                Recommended Action Types for Danish Applications
              </h2>
              <button
                onClick={() => setShowDanishRecommendations(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Hide
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {DANISH_RECOMMENDED_ACTION_TYPES.map((type, idx) => {
                const analysis = actionTypeAnalysis.find(a => a.name === type.name);
                return (
                  <div 
                    key={idx}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => setSelectedActionType(type.name)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{type.name}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            type.priority === 'HIGH' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {type.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{type.reason}</p>
                        <div className="flex gap-4 mt-2 text-xs text-gray-500">
                          <span>Avg: {type.avgGrant}</span>
                          <span>Timeline: {type.timeline}</span>
                        </div>
                      </div>
                      {analysis && (
                        <div className="text-right ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {analysis.count} projects
                          </div>
                          <div className="text-xs text-gray-600">
                            €{(analysis.avgFunding / 1000).toFixed(0)}K avg
                          </div>
                          {analysis.danishCoordinators.length > 0 && (
                            <div className="text-xs text-blue-600 mt-1">
                              {analysis.danishCoordinators.length} Danish
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {grants.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
              <Building2 className="w-5 h-5 mr-2 text-purple-600" />
              Action Type Analysis
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Projects</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Funding</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Danish Coordinators</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {actionTypeAnalysis.slice(0, 15).map((analysis, idx) => (
                    <tr 
                      key={idx} 
                      className={`hover:bg-gray-50 cursor-pointer ${
                        analysis.isRecommended ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedActionType(analysis.name)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {analysis.isRecommended && (
                            <Target className="w-4 h-4 text-blue-600" />
                          )}
                          <span className="text-sm text-gray-900">{analysis.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{analysis.count}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-green-600">
                        €{(analysis.avgFunding / 1000).toFixed(0)}K
                      </td>
                      <td className="px-4 py-3">
                        {analysis.danishCoordinators.length > 0 ? (
                          <div className="text-xs text-gray-600">
                            <div className="font-medium text-blue-600 mb-1">
                              {analysis.danishCoordinators.length} organizations
                            </div>
                            {analysis.danishCoordinators.slice(0, 3).map((org, i) => (
                              <div key={i}>{org}</div>
                            ))}
                            {analysis.danishCoordinators.length > 3 && (
                              <div className="text-gray-400">+{analysis.danishCoordinators.length - 3} more</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">None</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {grants.length > 0 && (
          <>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects, organizations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Countries</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>

                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>

                <select
                  value={selectedActionType}
                  onChange={(e) => setSelectedActionType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-3"
                >
                  <option value="">All Action Types</option>
                  {actionTypes.map(type => (
                    <option key={type} value={type}>
                      {type} {recommendedActionTypeNames.includes(type) ? '⭐' : ''}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Min Grant (€)"
                  value={minGrant}
                  onChange={(e) => setMinGrant(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <input
                  type="number"
                  placeholder="Max Grant (€)"
                  value={maxGrant}
                  onChange={(e) => setMaxGrant(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('Project Title')}
                      >
                        Project Title <SortIcon field="Project Title" />
                      </th>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('Coordinating organisation name')}
                      >
                        Coordinator <SortIcon field="Coordinating organisation name" />
                      </th>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort("Coordinator's country")}
                      >
                        Country <SortIcon field="Coordinator's country" />
                      </th>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('Funding Year')}
                      >
                        Year <SortIcon field="Funding Year" />
                      </th>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('EU Grant award in euros (This amount represents the grant awarded after the selection stage and is indicative. Please note that any changes made during or after the project\'s lifetime will not be reflected here.)')}
                      >
                        Grant Amount <SortIcon field="EU Grant award in euros (This amount represents the grant awarded after the selection stage and is indicative. Please note that any changes made during or after the project's lifetime will not be reflected here.)" />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Link
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAndSortedGrants.map((grant, idx) => (
                      <tr key={idx} className={`hover:bg-gray-50 transition-colors ${
                        grant["Coordinator's country"] === 'DK' ? 'bg-blue-50' : ''
                      }`}>
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium text-gray-900">{grant['Project Title']}</div>
                          <div className="text-xs text-gray-500 mt-1 line-clamp-2">{grant['Project Summary']}</div>
                          {grant['Topics'] && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {grant['Topics'].split('|').slice(0, 3).map((topic, i) => (
                                <span key={i} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {grant['Coordinating organisation name']}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {grant["Coordinator's country"]}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {grant['Funding Year']}
                        </td>
                        <td className="px-4 py-4 text-sm font-semibold text-green-600">
                          €{grant['EU Grant award in euros (This amount represents the grant awarded after the selection stage and is indicative. Please note that any changes made during or after the project\'s lifetime will not be reflected here.)']?.toLocaleString() || '0'}
                        </td>
                        <td className="px-4 py-4 text-xs text-gray-600 max-w-xs">
                          <div className="flex items-center gap-1">
                            {recommendedActionTypeNames.includes(grant['Action Type']) && (
                              <Target className="w-3 h-3 text-blue-600" />
                            )}
                            <span>{grant['Action Type']}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <a
                            href={grant['Results Platform Project Card']}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View →
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}