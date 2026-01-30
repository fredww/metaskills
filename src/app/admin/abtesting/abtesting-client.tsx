"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'

interface TestResult {
  id: string
  name: string
  description: string | null
  isActive: boolean
  testType: string
  testContext: string
  trafficAllocation: number
  createdAt: string
  startDate: string
  endDate: string | null
  results: {
    totalAssignments: number
    variantA: {
      count: number
      percentage: number
      conversions: Record<string, number>
    }
    variantB: {
      count: number
      percentage: number
      conversions: Record<string, number>
    }
  }
}

export default function ABTestingClient() {
  const { data: session } = useSession()
  const [tests, setTests] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTest, setSelectedTest] = useState<TestResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (session) {
      fetchTests()
    }
  }, [session])

  const fetchTests = async () => {
    try {
      const response = await fetch('/api/abtesting/results')

      if (response.status === 401) {
        setError('Please sign in to view analytics')
        setLoading(false)
        return
      }

      if (response.status === 403) {
        setError('Admin access required')
        setLoading(false)
        return
      }

      if (response.ok) {
        const data = await response.json()
        setTests(data.tests)
      } else {
        setError('Failed to load tests')
      }
    } catch (error) {
      console.error('Failed to fetch A/B tests:', error)
      setError('Failed to load tests')
    } finally {
      setLoading(false)
    }
  }

  const toggleTestStatus = async (testId: string, isActive: boolean) => {
    try {
      const response = await fetch('/api/abtesting/results', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testId, isActive })
      })

      if (response.status === 403) {
        setError('Admin access required')
        return
      }

      if (response.ok) {
        fetchTests()
      } else {
        setError('Failed to update test')
      }
    } catch (error) {
      console.error('Failed to update test:', error)
      setError('An error occurred')
    }
  }

  // Unauthorized state
  if (!session) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-serif font-bold text-[#2D2D2D] mb-4">
            A/B Testing Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Please sign in to view analytics
          </p>
          <Button
            asChild
            className="bg-[#8DA399] hover:bg-[#6B8379] text-white"
          >
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Forbidden state
  if (error === 'Admin access required') {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-4xl font-serif font-bold text-[#2D2D2D] mb-4">
              Access Denied
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              You need administrator privileges to access this page.
            </p>
            <Button
              asChild
              className="bg-[#8DA399] hover:bg-[#6B8379] text-white"
            >
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">Loading A/B tests...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error && error !== 'Admin access required') {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  const getConversionRate = (conversions: Record<string, number>, variantCount: number) => {
    const totalConversions = Object.values(conversions).reduce((sum, count) => sum + count, 0)
    return variantCount > 0 ? ((totalConversions / variantCount) * 100).toFixed(2) : '0.00'
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-2">
            A/B 测试管理
          </h1>
          <p className="text-gray-600">
            管理和监控资源优化实验
          </p>
        </div>

        {/* Tests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {tests.map((test) => (
            <Card
              key={test.id}
              className={`border-[#E5E0D8] hover:shadow-lg transition-shadow cursor-pointer ${
                selectedTest?.id === test.id ? 'ring-2 ring-[#8DA399]' : ''
              }`}
              onClick={() => setSelectedTest(test)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg font-serif text-[#2D2D2D]">
                    {test.name}
                  </CardTitle>
                  <span className={`px-2 py-1 rounded text-xs ${
                    test.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {test.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                {test.description && (
                  <p className="text-sm text-gray-600">{test.description}</p>
                )}
              </CardHeader>

              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{test.testType.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Context:</span>
                    <span className="font-medium">{test.testContext}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Split:</span>
                    <span className="font-medium">
                      {test.trafficAllocation}% / {100 - test.trafficAllocation}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Participants:</span>
                    <span className="font-medium">{test.results.totalAssignments}</span>
                  </div>

                  <div className="pt-2 border-t border-[#E5E0D8]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[#8DA399] font-medium">Variant A:</span>
                      <span className="font-bold">
                        {getConversionRate(test.results.variantA.conversions, test.results.variantA.count)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#C7826B] font-medium">Variant B:</span>
                      <span className="font-bold">
                        {getConversionRate(test.results.variantB.conversions, test.results.variantB.count)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed View */}
        {selectedTest && (
          <Card className="border-[#E5E0D8]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-serif text-[#2D2D2D]">
                  {selectedTest.name}
                </CardTitle>
                <Button
                  onClick={() => toggleTestStatus(selectedTest.id, !selectedTest.isActive)}
                  variant={selectedTest.isActive ? 'destructive' : 'default'}
                  className={selectedTest.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-[#8DA399] hover:bg-[#6B8379]'}
                >
                  {selectedTest.isActive ? 'Stop Test' : 'Start Test'}
                </Button>
              </div>
              {selectedTest.description && (
                <p className="text-gray-600 mt-2">{selectedTest.description}</p>
              )}
            </CardHeader>

            <CardContent>
              {/* Test Configuration */}
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-[#2D2D2D] mb-2">Configuration</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedTest.testType.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Context:</span>
                      <span className="font-medium">{selectedTest.testContext}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Traffic Split:</span>
                      <span className="font-medium">
                        {selectedTest.trafficAllocation}% / {100 - selectedTest.trafficAllocation}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Started:</span>
                      <span className="font-medium">
                        {new Date(selectedTest.startDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Variant A */}
                <div className="bg-[#8DA399]/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#8DA399] mb-2">Variant A (Control)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Participants:</span>
                      <span className="font-bold">{selectedTest.results.variantA.count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Percentage:</span>
                      <span className="font-bold">{selectedTest.results.variantA.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="pt-2 border-t border-[#8DA399]/20">
                      {Object.entries(selectedTest.results.variantA.conversions).map(([type, count]) => (
                        <div key={type} className="flex justify-between">
                          <span className="text-gray-600 capitalize">{type.toLowerCase()}:</span>
                          <span className="font-medium">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Variant B */}
                <div className="bg-[#C7826B]/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#C7826B] mb-2">Variant B (Test)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Participants:</span>
                      <span className="font-bold">{selectedTest.results.variantB.count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Percentage:</span>
                      <span className="font-bold">{selectedTest.results.variantB.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="pt-2 border-t border-[#C7826B]/20">
                      {Object.entries(selectedTest.results.variantB.conversions).map(([type, count]) => (
                        <div key={type} className="flex justify-between">
                          <span className="text-gray-600 capitalize">{type.toLowerCase()}:</span>
                          <span className="font-medium">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Winner Indicator */}
              {selectedTest.results.totalAssignments > 50 && (
                <div className="bg-[#FDFBF7] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#2D2D2D] mb-2">Analysis</h4>
                  <p className="text-sm text-gray-600">
                    {parseFloat(getConversionRate(selectedTest.results.variantA.conversions, selectedTest.results.variantA.count)) >
                    parseFloat(getConversionRate(selectedTest.results.variantB.conversions, selectedTest.results.variantB.count))
                      ? `✅ Variant A is currently performing better by ${(
                          parseFloat(getConversionRate(selectedTest.results.variantA.conversions, selectedTest.results.variantA.count)) -
                          parseFloat(getConversionRate(selectedTest.results.variantB.conversions, selectedTest.results.variantB.count))
                        ).toFixed(2)}%`
                      : `✅ Variant B is currently performing better by ${(
                          parseFloat(getConversionRate(selectedTest.results.variantB.conversions, selectedTest.results.variantB.count)) -
                          parseFloat(getConversionRate(selectedTest.results.variantA.conversions, selectedTest.results.variantA.count))
                        ).toFixed(2)}%`
                    }
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Statistical significance may not be reached yet. Continue collecting data.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
