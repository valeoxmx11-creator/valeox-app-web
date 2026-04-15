'use client';

import { useState } from 'react';

type Provider = 'google' | 'facebook' | 'email';

type StepOneState = {
  full_name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  company_size: '1-10' | '11-50' | '51-200' | '201-1000' | '1000+';
  sector: string;
};

type StepTwoState = {
  main_problem: string;
  main_interest:
    | 'operational-excellence'
    | 'digital-transformation'
    | 'kpi-architecture'
    | 'cost-optimization'
    | 'change-management';
  accepts_whatsapp: boolean;
  accepts_marketing: boolean;
  accepts_privacy: boolean;
};

export function DiscoveryForm({ stateToken, provider }: { stateToken: string; provider: Provider }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [stepOne, setStepOne] = useState<StepOneState>({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    company_size: '11-50',
    sector: '',
  });

  const [stepTwo, setStepTwo] = useState<StepTwoState>({
    main_problem: '',
    main_interest: 'operational-excellence',
    accepts_whatsapp: true,
    accepts_marketing: false,
    accepts_privacy: false,
  });

  const updateStepOne = <K extends keyof StepOneState>(key: K, value: StepOneState[K]) => {
    setStepOne((prev) => ({ ...prev, [key]: value }));
  };

  const updateStepTwo = <K extends keyof StepTwoState>(key: K, value: StepTwoState[K]) => {
    setStepTwo((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    setSubmitting(true);
    setError(null);

    const response = await fetch('/api/leads/discovery/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        state: stateToken,
        auth_provider: provider,
        step_one: stepOne,
        step_two: stepTwo,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error ?? 'No fue posible completar el registro.');
      setSubmitting(false);
      return;
    }

    if (result.outcome === 'whatsapp' && result.whatsappRedirect) {
      window.location.href = result.whatsappRedirect;
      return;
    }

    window.location.href = result.thankYouUrl ?? '/gracias';
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      {step === 1 ? (
        <div style={{ display: 'grid', gap: '0.6rem' }}>
          <input placeholder="Nombre completo" value={stepOne.full_name} onChange={(e) => updateStepOne('full_name', e.target.value)} />
          <input placeholder="Correo" type="email" value={stepOne.email} onChange={(e) => updateStepOne('email', e.target.value)} />
          <input placeholder="Teléfono" value={stepOne.phone} onChange={(e) => updateStepOne('phone', e.target.value)} />
          <input placeholder="Empresa" value={stepOne.company} onChange={(e) => updateStepOne('company', e.target.value)} />
          <input placeholder="Cargo" value={stepOne.position} onChange={(e) => updateStepOne('position', e.target.value)} />
          <select value={stepOne.company_size} onChange={(e) => updateStepOne('company_size', e.target.value as StepOneState['company_size'])}>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-1000">201-1000</option>
            <option value="1000+">1000+</option>
          </select>
          <input placeholder="Sector" value={stepOne.sector} onChange={(e) => updateStepOne('sector', e.target.value)} />
          <button onClick={() => setStep(2)}>Continuar</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '0.6rem' }}>
          <textarea placeholder="¿Cuál es el principal problema operativo?" value={stepTwo.main_problem} onChange={(e) => updateStepTwo('main_problem', e.target.value)} />
          <select
            value={stepTwo.main_interest}
            onChange={(e) => updateStepTwo('main_interest', e.target.value as StepTwoState['main_interest'])}
          >
            <option value="operational-excellence">Operational Excellence</option>
            <option value="digital-transformation">Digital Transformation</option>
            <option value="kpi-architecture">KPI Architecture</option>
            <option value="cost-optimization">Cost Optimization</option>
            <option value="change-management">Change Management</option>
          </select>
          <label><input type="checkbox" checked={stepTwo.accepts_whatsapp} onChange={(e) => updateStepTwo('accepts_whatsapp', e.target.checked)} /> Acepto contacto por WhatsApp</label>
          <label><input type="checkbox" checked={stepTwo.accepts_marketing} onChange={(e) => updateStepTwo('accepts_marketing', e.target.checked)} /> Acepto comunicaciones de valor</label>
          <label><input type="checkbox" checked={stepTwo.accepts_privacy} onChange={(e) => updateStepTwo('accepts_privacy', e.target.checked)} /> Acepto política de privacidad</label>
          {error ? <p>{error}</p> : null}
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button onClick={() => setStep(1)} disabled={submitting}>Atrás</button>
            <button onClick={submit} disabled={submitting}>Finalizar</button>
          </div>
        </div>
      )}
    </div>
  );
}
