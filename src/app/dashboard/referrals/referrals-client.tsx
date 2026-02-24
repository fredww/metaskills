'use client'

/**
 * Referral Dashboard Client Component
 * Displays referral stats, earnings, and allows payout requests
 */

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ReferralStats {
  referralCode: string | null
  totalReferrals: number
  activeReferrals: number
  totalConversions: number
  totalEarnings: number
  currentBalance: number
  pendingPayouts: number
  tier: {
    level: string
    commissionRate: number
    benefits: string[]
  }
}

export function ReferralDashboardClient() {
  const [stats, setStats] = useState<ReferralStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [payoutAmount, setPayoutAmount] = useState('')
  const [requestingPayout, setRequestingPayout] = useState(false)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/referrals')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching referral stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateReferralCode = async () => {
    try {
      const response = await fetch('/api/referrals', { method: 'POST' })
      if (response.ok) {
        const data = await response.json()
        setStats((prev) => ({ ...prev!, referralCode: data.referralCode }))
      }
    } catch (error) {
      console.error('Error generating referral code:', error)
    }
  }

  const copyReferralLink = () => {
    if (stats?.referralCode) {
      const link = `${window.location.origin}/?ref=${stats.referralCode}`
      navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const requestPayout = async () => {
    const amount = Number(payoutAmount)
    if (!amount || amount < 10) {
      alert('Minimum payout amount is $10')
      return
    }

    if (stats && amount > stats.currentBalance) {
      alert('Insufficient balance')
      return
    }

    setRequestingPayout(true)
    try {
      const response = await fetch('/api/referrals/payout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          payoutMethod: 'paypal',
          payoutDetails: { email: 'user@example.com' }
        })
      })

      if (response.ok) {
        alert('Payout requested successfully!')
        setPayoutAmount('')
        fetchStats()
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to request payout')
      }
    } catch (error) {
      console.error('Error requesting payout:', error)
      alert('Failed to request payout')
    } finally {
      setRequestingPayout(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">推荐计划</h1>
        <p className="text-gray-600">邀请朋友加入，赚取收益分成</p>
      </div>

      {/* Referral Code Section */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">你的推荐码</h2>
        {stats?.referralCode ? (
          <div className="flex gap-4 items-center">
            <Input
              value={`${window.location.origin}/?ref=${stats.referralCode}`}
              readOnly
              className="flex-1"
            />
            <Button onClick={copyReferralLink} variant="outline">
              {copied ? '已复制!' : '复制链接'}
            </Button>
          </div>
        ) : (
          <Button onClick={generateReferralCode}>
            生成推荐码
          </Button>
        )}
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-1">总推荐数</div>
          <div className="text-3xl font-bold">{stats?.totalReferrals || 0}</div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-1">活跃推荐</div>
          <div className="text-3xl font-bold">{stats?.activeReferrals || 0}</div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-1">转化数</div>
          <div className="text-3xl font-bold">{stats?.totalConversions || 0}</div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-1">当前余额</div>
          <div className="text-3xl font-bold text-green-600">
            ${stats?.currentBalance?.toFixed(2) || '0.00'}
          </div>
        </Card>
      </div>

      {/* Tier & Commission Rate */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">当前等级</h2>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-[#8DA399]">
              {stats?.tier.level || 'BRONZE'}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              分成比例: {stats?.tier.commissionRate || 20}%
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold mb-2">权益:</div>
            <ul className="text-sm text-gray-600">
              {stats?.tier.benefits.map((benefit, i) => (
                <li key={i}>• {benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Payout Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">申请提现</h2>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">提现金额 (USD)</label>
            <Input
              type="number"
              min="10"
              step="0.01"
              value={payoutAmount}
              onChange={(e) => setPayoutAmount(e.target.value)}
              placeholder="最低 $10"
            />
            <div className="text-sm text-gray-600 mt-1">
              可用余额: ${stats?.currentBalance?.toFixed(2) || '0.00'}
            </div>
          </div>
          <Button
            onClick={requestPayout}
            disabled={requestingPayout}
            className="bg-[#8DA399] hover:bg-[#6B8379]"
          >
            {requestingPayout ? '处理中...' : '申请提现'}
          </Button>
        </div>

        {/* Pending Payouts */}
        {stats?.pendingPayouts > 0 && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <div className="text-sm text-yellow-800">
              你有 {stats.pendingPayouts} 个待处理的提现请求
            </div>
          </div>
        )}
      </Card>

      {/* How It Works */}
      <Card className="p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">如何赚钱?</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>分享你的专属推荐链接给朋友</li>
          <li>朋友注册并开始使用MetaSkills</li>
          <li>当他们购买推荐书籍时，你获得分成</li>
          <li>累积$10后可以申请提现</li>
        </ol>

        {/* Tier Progress */}
        {stats && (
          <div className="mt-6">
            <div className="text-sm font-medium mb-2">等级进度</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#8DA399] h-2 rounded-full"
                style={{
                  width: `${Math.min((stats.activeReferrals / 100) * 100, 100)}%`
                }}
              ></div>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {stats.activeReferrals} / 100 活跃推荐 (达到 Platinum)
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
