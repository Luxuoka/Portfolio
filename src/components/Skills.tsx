import React from 'react';
import { Code2 } from 'lucide-react';

interface SkillsProps {
  skills?: string[];
}

export default function Skills({ skills = [] }: SkillsProps) {
  if (!skills || skills.length === 0) return null;

  return (
    <section id="skills" className="py-20 border-b border-line bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-10 border-b border-line items-baseline">
          <div className="md:col-span-4">
            <span className="px-2.5 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-semibold rounded inline-block">
              01 / KEAHLIAN TEKNIS
            </span>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal leading-tight">
              Fondasi arsitektur, bahasa pemrograman, dan ekosistem modern.
            </h2>
          </div>
        </div>

        {/* Skills Grid: Warm, Modern Badges with Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-10">
          {skills.map((skill, index) => {
            const formattedIndex = String(index + 1).padStart(2, '0');
            return (
              <div
                key={`${skill}-${index}`}
                className="p-4 rounded-lg bg-surface border border-line hover:border-accent/50 hover:shadow-sm transition-all duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-accent font-semibold px-2 py-0.5 bg-accent/10 rounded">
                    {formattedIndex}
                  </span>
                  <span className="font-sans text-sm font-semibold text-ink group-hover:text-accent transition-colors">
                    {skill}
                  </span>
                </div>
                <Code2 className="w-4 h-4 text-accent/40 group-hover:text-accent transition-colors shrink-0" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
