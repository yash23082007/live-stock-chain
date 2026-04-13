import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import api from '../lib/api'

export function HarvestReportPage() {
  const { register, handleSubmit, watch } = useForm()

  const yieldKg = watch('yieldKg', 0)
  const pricePerKg = watch('pricePerKg', 0)
  const grossRevenue = (yieldKg * pricePerKg).toFixed(2)

  const submitReport = useMutation({
    mutationFn: (data: any) => new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000))
  })

  // Add state for submission notification
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-xl font-bold mb-6">📊 Submit Harvest Report</h1>

      {submitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">Harvest report submitted successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit(d => {
        submitReport.mutate(d, {
          onSuccess: () => setSubmitted(true)
        });
      })} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Crop Type</label>
          <input {...register('cropType')} className="mt-1 w-full border rounded-lg p-3" placeholder="e.g. Maize, Wheat" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Total Yield (kg)</label>
          <input {...register('yieldKg', { valueAsNumber: true })} type="number" className="mt-1 w-full border rounded-lg p-3" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Market Price per kg (KES)</label>
          <input {...register('pricePerKg', { valueAsNumber: true })} type="number" className="mt-1 w-full border rounded-lg p-3" />
        </div>

        {/* Auto-calculated revenue */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Estimated Gross Revenue</p>
          <p className="text-2xl font-bold text-green-700">KES {Number(grossRevenue).toLocaleString()}</p>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="text-sm font-medium text-gray-700">Harvest Photos</label>
          <input {...register('photos')} type="file" multiple accept="image/*" className="mt-1 w-full" />
        </div>

        <button
          type="submit"
          disabled={submitReport.isPending}
          className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 disabled:opacity-50"
        >
          {submitReport.isPending ? 'Submitting...' : 'Submit Harvest Report'}
        </button>
      </form>
    </div>
  )
}
