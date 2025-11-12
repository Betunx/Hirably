import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface CompanyValue {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-meet-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meet-us.component.html',
  styleUrl: './meet-us.component.scss'
})
export class MeetUsComponent {
  companyValues: CompanyValue[] = [
    {
      icon: '🎯',
      title: 'Mission-Driven',
      description: 'We believe in making nearshore hiring accessible, transparent, and efficient for companies of all sizes.'
    },
    {
      icon: '🤝',
      title: 'Partnership Approach',
      description: 'We work as an extension of your team, understanding your needs and delivering tailored solutions.'
    },
    {
      icon: '💡',
      title: 'Innovation First',
      description: 'Our platform combines cutting-edge technology with human expertise to streamline every step of the hiring process.'
    },
    {
      icon: '🌟',
      title: 'Quality Commitment',
      description: 'We maintain rigorous standards in recruitment, compliance, and service delivery.'
    }
  ];

  teamMembers: TeamMember[] = [
    {
      name: 'Leadership Team',
      role: 'Executive Leadership',
      image: '👔',
      bio: 'Our experienced leadership team brings decades of combined expertise in HR, technology, and cross-border operations.'
    },
    {
      name: 'Recruitment Team',
      role: 'Talent Acquisition',
      image: '🎯',
      bio: 'Expert recruiters who understand both US/Canadian business culture and the Mexican talent market.'
    },
    {
      name: 'Compliance Team',
      role: 'Legal & HR Compliance',
      image: '⚖️',
      bio: 'Specialists ensuring 100% compliance with Mexican labor laws and international regulations.'
    },
    {
      name: 'Support Team',
      role: 'Client Success',
      image: '💬',
      bio: 'Dedicated support professionals available to assist you throughout your hiring journey.'
    }
  ];

  contactInfo = {
    email: 'hello@hirably.com',
    phone: '+1 (555) 123-4567',
    address: 'Remote-First Company | Serving US, Canada & Mexico'
  };
}
