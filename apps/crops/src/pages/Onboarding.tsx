import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const steps = ['Personal Info', 'Farm Details', 'KYC Documents', 'Review']

const personalInfoSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().regex(/^(\+254[0-9]{9}|\+91[0-9]{10})$/, 'Valid Kenyan or Indian phone required'),
  nationalId: z.string().min(7).max(10),
  dateOfBirth: z.string()
})

const PersonalInfoStep = ({ register, errors }: any) => (
  <div className="space-y-4">
    <h2 className="text-xl font-bold">Personal Information</h2>
    <div>
      <input {...register('firstName')} placeholder="First Name" className="border p-2 rounded w-full" />
      {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
    </div>
    <div>
      <input {...register('lastName')} placeholder="Last Name" className="border p-2 rounded w-full" />
      {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
    </div>
    <div>
      <input {...register('phone')} placeholder="+918290917517" className="border p-2 rounded w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500" />   
      {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
    </div>
    <div>
      <input {...register('nationalId')} placeholder="National ID" className="border p-2 rounded w-full" />
      {errors.nationalId && <span className="text-red-500 text-sm">{errors.nationalId.message}</span>}
    </div>
    <div>
      <input type="date" {...register('dateOfBirth')} className="border p-2 rounded w-full" />
      {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>}
    </div>
  </div>
)

const FarmDetailsStep = () => <div>
  <h2 className="text-xl font-bold">Farm Details</h2>
  <div className="space-y-4 mt-4">
    <input placeholder="Farm Size (Hectares)" type="number" className="border p-2 rounded w-full" />
    <input placeholder="Primary Crop" className="border p-2 rounded w-full" />
    <input placeholder="Location" className="border p-2 rounded w-full" />
  </div>
</div>

const KYCDocumentsStep = () => <div>
  <h2 className="text-xl font-bold">KYC Documents</h2>
  <div className="space-y-4 mt-4">
    <div className="border-2 border-dashed border-gray-300 p-8 text-center rounded-lg">
      <p className="text-gray-500">Upload ID Document (Front & Back)</p>
      <button className="mt-2 px-4 py-2 bg-gray-100 rounded">Select File</button>
    </div>
    <div className="border-2 border-dashed border-gray-300 p-8 text-center rounded-lg">
      <p className="text-gray-500">Upload Title Deed / Land Lease</p>
      <button className="mt-2 px-4 py-2 bg-gray-100 rounded">Select File</button>
    </div>
  </div>
</div>
const ReviewStep = ({ formData }: any) => <div><h2 className="text-xl font-bold">Review</h2><pre>{JSON.stringify(formData, null, 2)}</pre></div>

export function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({})

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(personalInfoSchema)
  })

  return (
    <div className="min-h-screen bg-green-50 p-4">
      {/* Progress Bar */}
      <div className="flex mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
              ${i <= step ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {i + 1}
            </div>
            <span className="ml-2 text-xs hidden sm:block">{s}</span>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2 ${i < step ? 'bg-green-600' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 0 && <PersonalInfoStep register={register} errors={errors} />}
      {step === 1 && <FarmDetailsStep />}
      {step === 2 && <KYCDocumentsStep />}
      {step === 3 && <ReviewStep formData={formData} />}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-6 py-2 border border-green-600 text-green-600 rounded-lg disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleSubmit((data) => {
            setFormData(f => ({ ...f, ...data }))
            setStep(s => Math.min(steps.length - 1, s + 1))
          })}
          className="px-6 py-2 bg-green-600 text-white rounded-lg"
        >
          {step === steps.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  )
}
