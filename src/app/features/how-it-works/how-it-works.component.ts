import { Component } from '@angular/core';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface Candidate {
  name: string;
  role: string;
  rate: string;
  experience: string;
  skills: string[];
}

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent {
  steps: Step[] = [
    {
      number: 1,
      title: 'Share Your Role',
      description: 'Upload your job description or fill a quick form.'
    },
    {
      number: 2,
      title: 'Get Instant Estimates',
      description: 'See hourly cost ranges in minutes.'
    },
    {
      number: 3,
      title: 'Access Pre-Vetted Candidates',
      description: 'Profiles of top talent ready for interviews in 3 days.'
    },
    {
      number: 4,
      title: 'Interview & Decide',
      description: 'You choose who to hire.'
    },
    {
      number: 5,
      title: 'We Handle Everything Else',
      description: 'Payroll, compliance, HR, benefits + lifetime guarantee.'
    }
  ];

  sampleCandidate: Candidate = {
    name: 'Juan C.',
    role: 'Senior Engineer',
    rate: '$21/hr',
    experience: '6+ years experience | Bilingual | Remote',
    skills: ['AutoCAD', 'SolidWorks', '3D Modeling', 'Project Management']
  };
}
