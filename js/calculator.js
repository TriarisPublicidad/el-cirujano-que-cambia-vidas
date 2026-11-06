let bmiSelectedSex = 'f';
      let bmiIsMetric = true;
      let bmiCurrentStep = 1;
      const bmiConditions = new Set();

      window.toggleBmiCondition = function(cond, btn) {
        if (bmiConditions.has(cond)) {
          bmiConditions.delete(cond);
          btn.classList.remove('bg-[#c5b191]/20', 'border-[#c5b191]', 'text-[#c5b191]', 'font-medium');
          btn.classList.add('bg-obsidian', 'border-white/10', 'text-stone');
        } else {
          bmiConditions.add(cond);
          btn.classList.add('bg-[#c5b191]/20', 'border-[#c5b191]', 'text-[#c5b191]', 'font-medium');
          btn.classList.remove('bg-obsidian', 'border-white/10', 'text-stone');
        }
      };

      window.openBmiModal = function() {
        const modal = document.getElementById('bmi-modal');
        if (!modal) return;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      };

      window.closeBmiModal = function() {
        const modal = document.getElementById('bmi-modal');
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
      };

      const bmiModalEl = document.getElementById('bmi-modal');
      if (bmiModalEl) {
        bmiModalEl.addEventListener('click', function(e) {
          if (e.target === this) closeBmiModal();
        });
      }

      window.goToBmiStep = function(step) {
        bmiCurrentStep = step;
        const s1 = document.getElementById('bmi-step-1');
        const s2 = document.getElementById('bmi-step-2');
        const s3 = document.getElementById('bmi-step-3');
        const bar = document.getElementById('bmi-progress-bar');
        const l1 = document.getElementById('step-label-1');
        const l2 = document.getElementById('step-label-2');
        const l3 = document.getElementById('step-label-3');

        if (s1 && s2 && s3) {
          s1.classList.toggle('hidden', step !== 1);
          s2.classList.toggle('hidden', step !== 2);
          s3.classList.toggle('hidden', step !== 3);
        }

        if (bar) {
          bar.style.width = step === 1 ? '33.33%' : (step === 2 ? '66.66%' : '100%');
        }

        if (l1 && l2 && l3) {
          l1.className = step >= 1 ? 'text-[#c5b191] font-semibold transition-colors' : 'text-stone transition-colors';
          l2.className = step >= 2 ? 'text-[#c5b191] font-semibold transition-colors' : 'text-stone transition-colors';
          l3.className = step >= 3 ? 'text-[#c5b191] font-semibold transition-colors' : 'text-stone transition-colors';
        }
      };

      window.selectBmiGender = function(gender) {
        bmiSelectedSex = gender;
        const cardF = document.getElementById('gender-card-f');
        const cardM = document.getElementById('gender-card-m');

        if (gender === 'f') {
          if (cardF) cardF.classList.add('border-[#c5b191]', 'bg-obsidian');
          if (cardM) cardM.classList.remove('border-[#c5b191]', 'bg-obsidian');
        } else {
          if (cardM) cardM.classList.add('border-[#c5b191]', 'bg-obsidian');
          if (cardF) cardF.classList.remove('border-[#c5b191]', 'bg-obsidian');
        }

        setTimeout(() => {
          goToBmiStep(2);
        }, 180);
      };

      window.setBmiUnit = function(metric) {
        bmiIsMetric = metric;
        const btnM = document.getElementById('modal-unit-metric');
        const btnI = document.getElementById('modal-unit-imperial');
        const grpM = document.getElementById('modal-grp-height-metric');
        const grpI = document.getElementById('modal-grp-height-imperial');
        const wLbl = document.getElementById('modal-weight-unit-label');
        const wBdg = document.getElementById('modal-weight-badge');
        const wIn = document.getElementById('modal-calc-weight');

        if (metric) {
          btnM.className = 'px-4 py-2 uppercase tracking-wider font-medium text-obsidian bg-[#c5b191] transition-colors';
          btnI.className = 'px-4 py-2 uppercase tracking-wider font-medium text-stone hover:text-alabaster transition-colors';
          if (grpM) grpM.classList.remove('hidden');
          if (grpI) grpI.classList.add('hidden');
          if (wLbl) wLbl.textContent = 'Kilogramos (kg)';
          if (wBdg) wBdg.textContent = 'kg';
          if (wIn) wIn.placeholder = 'Ej. 95';
        } else {
          btnI.className = 'px-4 py-2 uppercase tracking-wider font-medium text-obsidian bg-[#c5b191] transition-colors';
          btnM.className = 'px-4 py-2 uppercase tracking-wider font-medium text-stone hover:text-alabaster transition-colors';
          if (grpM) grpM.classList.add('hidden');
          if (grpI) grpI.classList.remove('hidden');
          if (wLbl) wLbl.textContent = 'Libras (lb)';
          if (wBdg) wBdg.textContent = 'lb';
          if (wIn) wIn.placeholder = 'Ej. 210';
        }
      };

      window.calculateBmiResult = function() {
        const err = document.getElementById('modal-calc-error');
        const wVal = parseFloat(document.getElementById('modal-calc-weight')?.value || 0);
        let hm = 0;
        let kg = 0;

        if (bmiIsMetric) {
          const hVal = parseFloat(document.getElementById('modal-calc-height')?.value || 0);
          hm = hVal / 100;
          kg = wVal;
        } else {
          const ft = parseFloat(document.getElementById('modal-calc-ft')?.value || 0);
          const inch = parseFloat(document.getElementById('modal-calc-in')?.value || 0);
          hm = ((ft * 30.48) + (inch * 2.54)) / 100;
          kg = wVal * 0.45359237;
        }

        if (!kg || !hm || hm < 1.0 || hm > 2.3 || kg < 30 || kg > 350) {
          if (err) err.classList.remove('hidden');
          return;
        }
        if (err) err.classList.add('hidden');

        const bmi = kg / (hm * hm);
        const idealFactor = bmiSelectedSex === 'f' ? 21.5 : 23.0;
        const idealKg = idealFactor * hm * hm;
        const excessKg = Math.max(0, kg - idealKg);

        const conv = v => bmiIsMetric ? v : (v / 0.45359237);
        const u = bmiIsMetric ? 'kg' : 'lb';

        const hasComorbidity = bmiConditions.size > 0;
        const condDict = {
          'diabetes': 'Diabetes Tipo 2',
          'hipertension': 'Hipertensión',
          'apnea': 'Apnea del Sueño',
          'higado': 'Hígado Graso'
        };
        const condNames = Array.from(bmiConditions).map(c => condDict[c] || c).join(', ');

        let catName = 'Obesidad Grado III';
        let badgeColorClass = 'bg-red-950/80 border-red-500/60 text-red-300';
        let numColorClass = 'text-red-400';
        let glowColor = '#ef4444';
        let procText = 'Candidato prioritario a Manga Gástrica o Bypass Gástrico.';

        if (bmi < 18.5) {
          catName = 'Bajo peso';
          badgeColorClass = 'bg-sky-950/80 border-sky-500/60 text-sky-300';
          numColorClass = 'text-sky-400';
          glowColor = '#38bdf8';
          procText = 'IMC por debajo del rango saludable. No se indica cirugía.';
        } else if (bmi < 25) {
          catName = 'Peso Normal (Saludable)';
          badgeColorClass = 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300';
          numColorClass = 'text-emerald-400';
          glowColor = '#10b981';
          procText = 'Tu peso está dentro del rango óptimo. Mantenimiento y prevención.';
        } else if (bmi < 30) {
          catName = 'Sobrepeso';
          badgeColorClass = 'bg-amber-950/80 border-amber-500/60 text-amber-300';
          numColorClass = 'text-amber-400';
          glowColor = '#f59e0b';
          procText = hasComorbidity
            ? `Candidato a Balón Gástrico o manejo metabólico preventivo para ${condNames}.`
            : 'Candidato habitual a manejo nutricional o Balón Gástrico no quirúrgico.';
        } else if (bmi < 35) {
          catName = hasComorbidity ? 'Obesidad Grado I + Comorbilidad' : 'Obesidad Grado I';
          badgeColorClass = 'bg-orange-950/80 border-orange-500/60 text-orange-300';
          numColorClass = 'text-orange-400';
          glowColor = '#f97316';
          procText = hasComorbidity
            ? `Candidato a Cirugía Metabólica (Bypass o Manga). Alta tasa de remisión y control de ${condNames} (hasta 85%).`
            : 'Candidato a Balón Gástrico o Manga Gástrica según evaluación clínica personalizada.';
        } else if (bmi < 40) {
          catName = 'Obesidad Grado II';
          badgeColorClass = 'bg-red-950/80 border-red-500/60 text-red-300';
          numColorClass = 'text-red-400';
          glowColor = '#ef4444';
          procText = hasComorbidity
            ? `Candidato prioritario a Bypass Gástrico o Manga Gástrica para resolución de ${condNames}.`
            : 'Candidato habitual a Manga Gástrica o Bypass Gástrico de alta precisión.';
        } else {
          catName = 'Obesidad Grado III';
          badgeColorClass = 'bg-red-950/80 border-red-500/60 text-red-300';
          numColorClass = 'text-red-400';
          glowColor = '#ef4444';
          procText = hasComorbidity
            ? `Candidato urgente a Cirugía Bariátrica / Metabólica para protección cardiovascular y control de ${condNames}.`
            : 'Candidato prioritario a Manga Gástrica o Bypass Gástrico laparoscópico.';
        }

        // DOM Updates
        const bmiValEl = document.getElementById('result-bmi-val');
        const bmiBdgEl = document.getElementById('result-bmi-badge');
        const bmiRecEl = document.getElementById('result-bmi-recommendation');
        const bmiIdealEl = document.getElementById('result-bmi-ideal');
        const bmiExcessEl = document.getElementById('result-bmi-excess');
        const glowEl = document.getElementById('result-glow');
        const pointerEl = document.getElementById('result-scale-pointer');

        if (bmiValEl) {
          bmiValEl.textContent = bmi.toFixed(1).replace('.', ',');
          bmiValEl.className = `font-serif text-5xl sm:text-6xl font-normal leading-none ${numColorClass}`;
        }
        if (bmiBdgEl) {
          bmiBdgEl.textContent = catName;
          bmiBdgEl.className = `inline-block px-3.5 py-1 text-xs uppercase tracking-widest font-semibold border ${badgeColorClass}`;
        }
        if (bmiRecEl) {
          bmiRecEl.innerHTML = `Indicación sugerida: <strong class="text-[#c5b191] font-normal">${procText}</strong>`;
        }
        if (bmiIdealEl) {
          bmiIdealEl.textContent = `~${Math.round(conv(idealKg))} ${u}`;
        }
        if (bmiExcessEl) {
          bmiExcessEl.textContent = `${Math.round(conv(excessKg))} ${u}`;
        }
        if (glowEl) {
          glowEl.style.backgroundColor = glowColor;
        }

        // Scale Pointer Position: range from 15 to 45 (30 units span)
        if (pointerEl) {
          const pct = Math.min(97, Math.max(3, ((bmi - 15) / 30) * 100));
          pointerEl.style.left = `${pct.toFixed(1)}%`;
        }

        // WhatsApp direct link with pre-filled message
        const waBtn = document.getElementById('btn-modal-whatsapp');
        if (waBtn) {
          const condNote = hasComorbidity ? ` (Afecciones: ${condNames})` : '';
          const waMsg = `Hola Dr. Carlos Gómez, calculé mi IMC en su web (${bmi.toFixed(1).replace('.', ',')} - ${catName}${condNote}, Peso: ${Math.round(wVal)}${u}, Estatura: ${Math.round(bmiIsMetric ? (hm*100) : (hm*100/2.54))}${bmiIsMetric ? 'cm' : 'in'}) y deseo solicitar una valoración médica.`;
          waBtn.href = 'https://wa.me/593988188639?text=' + encodeURIComponent(waMsg);
        }

        // Expose to window.drgCalculo for Kommo CRM submission
        window.drgCalculo = {
          imc: bmi.toFixed(1),
          categoria: catName,
          comorbilidades: condNames || 'Ninguna indicada',
          exceso: `${Math.round(conv(excessKg))} ${u}`,
          peso_kg: kg.toFixed(1),
          estatura_cm: (hm * 100).toFixed(1),
          sexo: bmiSelectedSex,
          peso_ideal: `${Math.round(conv(idealKg))} ${u}`,
          procedimiento_sugerido: procText
        };

        goToBmiStep(3);
      };

      window.toggleEmailReportForm = function() {
        const container = document.getElementById('email-report-container');
        const arrow = document.getElementById('email-toggle-arrow');
        if (!container) return;
        const isHidden = container.classList.contains('hidden');
        container.classList.toggle('hidden', !isHidden);
        if (arrow) arrow.textContent = isHidden ? '↑' : '↓';
      };
