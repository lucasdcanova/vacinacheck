{
  "documento": {
    "titulo": "Folder de Divulgação - Clínica de Vacinação",
    "formato": "A5",
    "dimensoes": {
      "largura_mm": 148,
      "altura_mm": 210,
      "orientacao": "retrato"
    },
    "margens_mm": {
      "superior": 8,
      "inferior": 8,
      "esquerda": 8,
      "direita": 8
    },
    "paleta_cores": {
      "primaria": "#1B5E7D",
      "secundaria": "#4ECDC4",
      "destaque": "#FF6B6B",
      "texto_principal": "#2D3436",
      "texto_secundario": "#636E72",
      "fundo_claro": "#F8F9FA",
      "fundo_secao": "#E8F4F8"
    },
    "tipografia": {
      "titulo_principal": {
        "fonte": "Montserrat Bold",
        "tamanho_pt": 18,
        "cor": "#1B5E7D"
      },
      "subtitulos": {
        "fonte": "Montserrat SemiBold",
        "tamanho_pt": 10,
        "cor": "#1B5E7D"
      },
      "corpo": {
        "fonte": "Open Sans",
        "tamanho_pt": 7,
        "cor": "#2D3436"
      },
      "notas": {
        "fonte": "Open Sans",
        "tamanho_pt": 6,
        "cor": "#636E72"
      }
    }
  },
  "layout": {
    "estrutura": "duas_colunas_com_header_footer",
    "secoes": [
      {
        "nome": "header",
        "posicao": "topo",
        "altura_percentual": 12,
        "conteudo": {
          "logo_placeholder": true,
          "logo_url": "https://saudelivrefloripa.com.br/logo-header.png",
          "texto_principal": "SAÚDE LIVRE VACINAS",
          "texto_secundario": "Unidade Florianópolis Centro",
          "tagline": "Prevenção é um ato de amor"
        }
      },
      {
        "nome": "intro_medico",
        "posicao": "abaixo_header",
        "altura_percentual": 8,
        "fundo": "#E8F4F8",
        "conteudo": {
          "icone": "estetoscopio",
          "texto": "Caro(a) Colega Pediatra, a Saúde Livre Florianópolis Centro oferece o calendário vacinal completo da rede privada, seguindo as recomendações da SBIm 2024/2025. Encaminhe seus pacientes com confiança."
        }
      },
      {
        "nome": "vacinas_principais",
        "posicao": "corpo_principal",
        "altura_percentual": 60,
        "layout": "duas_colunas"
      },
      {
        "nome": "diferenciais",
        "posicao": "antes_footer",
        "altura_percentual": 12,
        "fundo": "#1B5E7D",
        "cor_texto": "#FFFFFF"
      },
      {
        "nome": "footer_contato",
        "posicao": "rodape",
        "altura_percentual": 8
      }
    ]
  },
  "conteudo_vacinas": {
    "nota_referencia": "Calendário SBIm 2024/2025 - Rede Privada",
    "categorias": [
      {
        "categoria": "VACINAS PEDIÁTRICAS (0-10 anos)",
        "icone": "bebe",
        "cor_destaque": "#4ECDC4",
        "vacinas": [
          {
            "nome": "BCG ID",
            "protege_contra": "Tuberculose (formas graves)",
            "idade_aplicacao": {
              "dose_unica": "Ao nascer",
              "observacao": "Até 5 anos se não vacinado"
            },
            "esquema_resumido": "Dose única ao nascer",
            "diferencial_privada": "Disponível para recuperação de doses"
          },
          {
            "nome": "Hepatite B",
            "protege_contra": "Hepatite B",
            "idade_aplicacao": {
              "dose_1": "Ao nascer (primeiras 12h de vida)",
              "dose_2": "2 meses",
              "dose_3": "6 meses",
              "observacao": "Pode ser feita com Hexavalente/Pentavalente"
            },
            "esquema_resumido": "Nascer + 2m + 6m",
            "diferencial_privada": "Disponível isolada e em combinadas (Hexa/Penta)"
          },
          {
            "nome": "Rotavírus Pentavalente (VR5)",
            "protege_contra": "Gastroenterite por rotavírus",
            "idade_aplicacao": {
              "dose_1": "2 meses (iniciar até 3m15d)",
              "dose_2": "4 meses",
              "dose_3": "6 meses (até 7m29d)",
              "observacao": "Idade máxima: 8 meses incompletos"
            },
            "esquema_resumido": "2m + 4m + 6m",
            "diferencial_privada": "5 sorotipos vs 1 do SUS - maior proteção"
          },
          {
            "nome": "Hexavalente Acelular",
            "protege_contra": "Difteria, Tétano, Coqueluche, Hib, Hepatite B, Poliomielite",
            "idade_aplicacao": {
              "dose_1": "2 meses",
              "dose_2": "4 meses",
              "dose_3": "6 meses",
              "reforco": "15-18 meses (com Pentavalente acelular)",
              "observacao": "Substitui múltiplas injeções"
            },
            "esquema_resumido": "2m + 4m + 6m + reforço 15-18m",
            "diferencial_privada": "★ EXCLUSIVA REDE PRIVADA - Menos reações, menos injeções"
          },
          {
            "nome": "Pentavalente Acelular (DTPa-Hib-VIP)",
            "protege_contra": "Difteria, Tétano, Coqueluche, Hib, Poliomielite",
            "idade_aplicacao": {
              "uso_primario": "2, 4, 6 meses (alternativa à Hexa)",
              "reforco_1": "15-18 meses",
              "reforco_2": "4-5 anos (DTPa-VIP ou DTPa)",
              "observacao": "Usar para reforços se Hexa usada no esquema primário"
            },
            "esquema_resumido": "2m + 4m + 6m + 15-18m + 4-5 anos",
            "diferencial_privada": "Componente acelular - menos eventos adversos"
          },
          {
            "nome": "Pneumocócica Conjugada 13/15/20V",
            "protege_contra": "Pneumonias, meningites, otites pneumocócicas",
            "idade_aplicacao": {
              "dose_1": "2 meses",
              "dose_2": "4 meses",
              "dose_3": "6 meses (opcional, conforme vacina)",
              "reforco": "12-15 meses",
              "observacao": "VPC15 e VPC20 são as mais recentes"
            },
            "esquema_resumido": "2m + 4m + (6m) + reforço 12-15m",
            "diferencial_privada": "VPC13/15/20 vs VPC10 do SUS - cobertura ampliada"
          },
          {
            "nome": "Meningocócica ACWY",
            "protege_contra": "Meningite meningocócica tipos A, C, W, Y",
            "idade_aplicacao": {
              "dose_1": "3 meses",
              "dose_2": "5 meses",
              "reforco_1": "12-15 meses",
              "reforco_2": "5-6 anos",
              "reforco_3": "11 anos",
              "observacao": "Reforços a cada 5 anos para adolescentes"
            },
            "esquema_resumido": "3m + 5m + 12-15m + 5-6a + 11a",
            "diferencial_privada": "4 sorogrupos vs apenas C no SUS"
          },
          {
            "nome": "Meningocócica B",
            "protege_contra": "Meningite meningocócica tipo B",
            "idade_aplicacao": {
              "dose_1": "3 meses",
              "dose_2": "5 meses",
              "reforco": "12-15 meses",
              "observacao": "Pode ser aplicada junto com MenACWY"
            },
            "esquema_resumido": "3m + 5m + reforço 12-15m",
            "diferencial_privada": "★ EXCLUSIVA REDE PRIVADA - Sorogrupo B é prevalente no Brasil"
          },
          {
            "nome": "Poliomielite Inativada (VIP)",
            "protege_contra": "Poliomielite (paralisia infantil)",
            "idade_aplicacao": {
              "dose_1": "2 meses",
              "dose_2": "4 meses",
              "dose_3": "6 meses",
              "reforco": "15-18 meses",
              "observacao": "Incluída na Hexa/Penta acelular"
            },
            "esquema_resumido": "2m + 4m + 6m + 15-18m",
            "diferencial_privada": "Injetável - mais segura que oral"
          },
          {
            "nome": "Influenza Tetravalente",
            "protege_contra": "Gripe (4 cepas)",
            "idade_aplicacao": {
              "inicio": "A partir de 6 meses",
              "primeira_vez": "2 doses com intervalo de 30 dias (< 9 anos)",
              "anual": "1 dose por ano",
              "observacao": "Campanha anual - geralmente março a julho"
            },
            "esquema_resumido": "≥6m: anual (2 doses na 1ª vez se <9a)",
            "diferencial_privada": "4 cepas vs 3 do SUS"
          },
          {
            "nome": "Febre Amarela",
            "protege_contra": "Febre amarela",
            "idade_aplicacao": {
              "dose_1": "9 meses",
              "reforco": "4 anos",
              "observacao": "SBIm recomenda 2ª dose 10 anos após se 1ª dose ≥5 anos"
            },
            "esquema_resumido": "9m + 4 anos",
            "diferencial_privada": "Disponível sem restrição de idade"
          },
          {
            "nome": "Tríplice Viral (SCR)",
            "protege_contra": "Sarampo, Caxumba, Rubéola",
            "idade_aplicacao": {
              "dose_1": "12 meses",
              "dose_2": "15 meses (pode ser Tetraviral)",
              "observacao": "Adultos não vacinados: 2 doses até 29 anos, 1 dose 30-59 anos"
            },
            "esquema_resumido": "12m + 15m",
            "diferencial_privada": "Disponível sem limite de idade"
          },
          {
            "nome": "Tetraviral (SCRV)",
            "protege_contra": "Sarampo, Caxumba, Rubéola, Varicela",
            "idade_aplicacao": {
              "dose": "15 meses",
              "observacao": "Substitui SCR + Varicela aos 15 meses"
            },
            "esquema_resumido": "15 meses (2ª dose de SCR + 1ª Varicela)",
            "diferencial_privada": "Combinada - menos injeções"
          },
          {
            "nome": "Varicela (Catapora)",
            "protege_contra": "Catapora",
            "idade_aplicacao": {
              "dose_1": "12 meses",
              "dose_2": "15 meses (Tetraviral) ou 4 anos",
              "observacao": "Suscetíveis podem vacinar em qualquer idade"
            },
            "esquema_resumido": "12m + 15m (ou 4a)",
            "diferencial_privada": "2ª dose garantida (SUS nem sempre disponível)"
          },
          {
            "nome": "Hepatite A",
            "protege_contra": "Hepatite A",
            "idade_aplicacao": {
              "dose_1": "12 meses",
              "dose_2": "18 meses",
              "observacao": "Não vacinados podem fazer em qualquer idade"
            },
            "esquema_resumido": "12m + 18m",
            "diferencial_privada": "2 doses completas (SUS oferece apenas 1 dose)"
          },
          {
            "nome": "Hepatite A+B Combinada",
            "protege_contra": "Hepatite A e B",
            "idade_aplicacao": {
              "inicio": "A partir de 12 meses",
              "esquema_pediatrico": "0, 1, 6 meses",
              "esquema_adulto": "0, 1, 6 meses",
              "observacao": "Praticidade para quem precisa das duas"
            },
            "esquema_resumido": "3 doses (0-1-6 meses)",
            "diferencial_privada": "★ EXCLUSIVA REDE PRIVADA - Praticidade"
          },
          {
            "nome": "HPV 9-valente (HPV9)",
            "protege_contra": "HPV (9 tipos) - Câncer cervical, anal, verrugas",
            "idade_aplicacao": {
              "inicio_ideal": "9 anos",
              "faixa_2_doses": "9-14 anos: 2 doses (0 e 6 meses)",
              "faixa_3_doses": "≥15 anos: 3 doses (0, 2, 6 meses)",
              "observacao": "Meninas E meninos. SUS oferece HPV4 dose única 9-14a"
            },
            "esquema_resumido": "9-14a: 2 doses | ≥15a: 3 doses",
            "diferencial_privada": "9 tipos vs 4 do SUS - proteção 90% vs 70%"
          },
          {
            "nome": "Dengue (Qdenga)",
            "protege_contra": "Dengue (4 sorotipos)",
            "idade_aplicacao": {
              "idade_minima": "4 anos",
              "idade_maxima": "60 anos",
              "dose_1": "A partir de 4 anos",
              "dose_2": "3 meses após a 1ª dose",
              "observacao": "Soropositivos e soronegativos. SUS: apenas 10-14 anos"
            },
            "esquema_resumido": "4-60 anos: 2 doses (intervalo 3m)",
            "diferencial_privada": "Disponível 4-60 anos (SUS: apenas 10-14 anos)"
          }
        ]
      },
      {
        "categoria": "PROTEÇÃO ESPECIAL - LACTENTES",
        "icone": "escudo",
        "cor_destaque": "#FF6B6B",
        "vacinas": [
          {
            "nome": "Nirsevimabe (Anticorpo Anti-VSR)",
            "protege_contra": "Vírus Sincicial Respiratório (bronquiolite grave)",
            "idade_aplicacao": {
              "faixa_etaria": "0-12 meses",
              "dose": "Dose única",
              "peso_menor_5kg": "50mg",
              "peso_maior_5kg": "100mg",
              "segunda_sazonalidade": "Até 2 anos em grupos de risco (200mg)",
              "observacao": "Pode ser aplicado a qualquer momento no 1º ano de vida"
            },
            "esquema_resumido": "Dose única ≤12 meses",
            "diferencial_privada": "★ NOVO - Proteção essencial contra bronquiolite grave"
          }
        ]
      },
      {
        "categoria": "ADOLESCENTES (10-19 anos)",
        "icone": "adolescente",
        "cor_destaque": "#9B59B6",
        "vacinas": [
          {
            "nome": "HPV 9-valente",
            "protege_contra": "HPV (9 tipos)",
            "idade_aplicacao": {
              "ideal": "9-14 anos",
              "esquema": "2 doses (0 e 6 meses)",
              "ate_19_anos": "2 doses se iniciado antes de 15 anos",
              "observacao": "Catch-up disponível"
            },
            "esquema_resumido": "9-14a: 2 doses",
            "diferencial_privada": "HPV9 com 9 sorotipos"
          },
          {
            "nome": "Meningocócica ACWY",
            "protege_contra": "Meningite meningocócica A, C, W, Y",
            "idade_aplicacao": {
              "reforco": "11-12 anos",
              "nao_vacinados": "2 doses (intervalo 5 anos até 15 anos)",
              "a_partir_16_anos": "Dose única",
              "observacao": "Reforço a cada 5 anos se risco mantido"
            },
            "esquema_resumido": "11a (reforço) ou 2 doses se não vacinado",
            "diferencial_privada": "Proteção ampliada vs MenC"
          },
          {
            "nome": "Meningocócica B",
            "protege_contra": "Meningite meningocócica tipo B",
            "idade_aplicacao": {
              "nao_vacinados": "2 doses (intervalo 1-2 meses)",
              "observacao": "Sorogrupo B prevalente em adolescentes"
            },
            "esquema_resumido": "2 doses",
            "diferencial_privada": "★ EXCLUSIVA REDE PRIVADA"
          },
          {
            "nome": "dTpa (Tríplice Acelular Adulto)",
            "protege_contra": "Difteria, Tétano, Coqueluche",
            "idade_aplicacao": {
              "reforco": "A partir de 9-10 anos",
              "intervalo": "A cada 10 anos (ou 5 anos se contactante de RN)",
              "observacao": "Substitui dT do calendário"
            },
            "esquema_resumido": "Reforço a cada 10 anos",
            "diferencial_privada": "Proteção contra coqueluche incluída"
          },
          {
            "nome": "Dengue (Qdenga)",
            "protege_contra": "Dengue",
            "idade_aplicacao": {
              "faixa": "10-19 anos",
              "esquema": "2 doses (intervalo 3 meses)",
              "observacao": "SUS oferece apenas 10-14 anos"
            },
            "esquema_resumido": "2 doses (intervalo 3m)",
            "diferencial_privada": "Disponível para toda adolescência"
          }
        ]
      },
      {
        "categoria": "GESTANTES",
        "icone": "gestante",
        "cor_destaque": "#E91E63",
        "vacinas": [
          {
            "nome": "dTpa (Tríplice Acelular Adulto)",
            "protege_contra": "Difteria, Tétano, Coqueluche",
            "idade_aplicacao": {
              "quando": "A cada gestação",
              "periodo_ideal": "20ª a 36ª semana",
              "observacao": "Protege o RN contra coqueluche nos primeiros meses"
            },
            "esquema_resumido": "1 dose a cada gestação (20-36 sem)",
            "diferencial_privada": "Essencial para proteção do recém-nascido"
          },
          {
            "nome": "Influenza Tetravalente",
            "protege_contra": "Gripe",
            "idade_aplicacao": {
              "quando": "Qualquer trimestre",
              "observacao": "Gestantes são grupo de risco para complicações"
            },
            "esquema_resumido": "1 dose (qualquer trimestre)",
            "diferencial_privada": "4 cepas"
          },
          {
            "nome": "VSR - Abrysvo (Gestantes)",
            "protege_contra": "VSR no recém-nascido",
            "idade_aplicacao": {
              "quando": "32ª a 36ª semana de gestação",
              "dose": "Dose única",
              "observacao": "Anticorpos passam para o bebê e protegem nos primeiros 6 meses"
            },
            "esquema_resumido": "Dose única (32-36 semanas)",
            "diferencial_privada": "★ NOVA - Alternativa ao Nirsevimabe no RN"
          },
          {
            "nome": "Hepatite B",
            "protege_contra": "Hepatite B",
            "idade_aplicacao": {
              "quando": "Se não vacinada anteriormente",
              "esquema": "3 doses (0, 1, 6 meses)",
              "observacao": "Segura em qualquer trimestre"
            },
            "esquema_resumido": "3 doses se não vacinada",
            "diferencial_privada": "Disponível isolada ou combinada"
          }
        ]
      },
      {
        "categoria": "ADULTOS (20-59 anos)",
        "icone": "adulto",
        "cor_destaque": "#3498DB",
        "vacinas": [
          {
            "nome": "dTpa ou dT",
            "protege_contra": "Difteria, Tétano, Coqueluche",
            "idade_aplicacao": {
              "reforco": "A cada 10 anos",
              "preferencia": "dTpa preferível a dT",
              "observacao": "Antecipar para 5 anos se ferimento grave"
            },
            "esquema_resumido": "Reforço a cada 10 anos",
            "diferencial_privada": "dTpa inclui proteção contra coqueluche"
          },
          {
            "nome": "Hepatite B",
            "protege_contra": "Hepatite B",
            "idade_aplicacao": {
              "nao_vacinados": "3 doses (0, 1, 6 meses)",
              "observacao": "Verificar soroconversão em grupos de risco"
            },
            "esquema_resumido": "3 doses se não vacinado",
            "diferencial_privada": "Disponível"
          },
          {
            "nome": "Hepatite A",
            "protege_contra": "Hepatite A",
            "idade_aplicacao": {
              "nao_vacinados": "2 doses (0 e 6 meses)",
              "observacao": "Especialmente viajantes e HSH"
            },
            "esquema_resumido": "2 doses",
            "diferencial_privada": "Disponível"
          },
          {
            "nome": "Tríplice Viral",
            "protege_contra": "Sarampo, Caxumba, Rubéola",
            "idade_aplicacao": {
              "20_a_29_anos": "2 doses se não vacinado",
              "30_a_59_anos": "1 dose se não vacinado",
              "observacao": "Importante para viajantes"
            },
            "esquema_resumido": "1-2 doses conforme idade",
            "diferencial_privada": "Sem limite de idade"
          },
          {
            "nome": "Varicela",
            "protege_contra": "Catapora",
            "idade_aplicacao": {
              "suscetiveis": "2 doses (intervalo 1-2 meses)",
              "observacao": "Quem não teve a doença e não foi vacinado"
            },
            "esquema_resumido": "2 doses se suscetível",
            "diferencial_privada": "Disponível"
          },
          {
            "nome": "HPV 9-valente",
            "protege_contra": "HPV",
            "idade_aplicacao": {
              "adultos": "3 doses (0, 2, 6 meses)",
              "idade_maxima_recomendada": "45 anos",
              "observacao": "Benefício mesmo para quem já iniciou vida sexual"
            },
            "esquema_resumido": "3 doses (0-2-6m)",
            "diferencial_privada": "HPV9 até 45 anos"
          },
          {
            "nome": "Influenza Tetravalente",
            "protege_contra": "Gripe",
            "idade_aplicacao": {
              "frequencia": "Anual",
              "observacao": "Especialmente comorbidades, profissionais de saúde"
            },
            "esquema_resumido": "Anual",
            "diferencial_privada": "4 cepas"
          },
          {
            "nome": "Febre Amarela",
            "protege_contra": "Febre amarela",
            "idade_aplicacao": {
              "nao_vacinados": "Dose única (ou 2 doses com intervalo 10 anos)",
              "observacao": "Obrigatória para algumas regiões e viagens"
            },
            "esquema_resumido": "1-2 doses",
            "diferencial_privada": "Disponível"
          },
          {
            "nome": "Herpes Zóster (Shingrix)",
            "protege_contra": "Herpes zóster (cobreiro)",
            "idade_aplicacao": {
              "rotina": "A partir de 50 anos",
              "grupos_risco": "A partir de 18 anos (imunossuprimidos)",
              "esquema": "2 doses (intervalo 2 meses)"
            },
            "esquema_resumido": "≥50a: 2 doses | ≥18a se risco",
            "diferencial_privada": "★ EXCLUSIVA REDE PRIVADA - Eficácia >90%"
          },
          {
            "nome": "Dengue (Qdenga)",
            "protege_contra": "Dengue",
            "idade_aplicacao": {
              "faixa": "4-60 anos",
              "esquema": "2 doses (intervalo 3 meses)"
            },
            "esquema_resumido": "2 doses",
            "diferencial_privada": "Disponível até 60 anos"
          }
        ]
      },
      {
        "categoria": "IDOSOS (≥60 anos)",
        "icone": "idoso",
        "cor_destaque": "#8E44AD",
        "vacinas": [
          {
            "nome": "Influenza Tetravalente HD (Alta Dose)",
            "protege_contra": "Gripe",
            "idade_aplicacao": {
              "indicacao": "≥60 anos",
              "frequencia": "Anual",
              "observacao": "4x mais antígenos - melhor resposta em idosos"
            },
            "esquema_resumido": "Anual",
            "diferencial_privada": "★ EXCLUSIVA REDE PRIVADA - Alta dose para idosos"
          },
          {
            "nome": "Pneumocócica Conjugada (VPC15/20)",
            "protege_contra": "Pneumonia, meningite pneumocócica",
            "idade_aplicacao": {
              "indicacao": "≥60 anos",
              "esquema": "Dose única de VPC20 ou VPC15 + VPP23",
              "observacao": "Verificar vacinação prévia"
            },
            "esquema_resumido": "1 dose VPC20 ou sequencial",
            "diferencial_privada": "VPC15/20 vs VPC10"
          },
          {
            "nome": "Pneumocócica 23-valente (VPP23)",
            "protege_contra": "Doenças pneumocócicas",
            "idade_aplicacao": {
              "indicacao": "≥60 anos ou grupos de risco",
              "esquema": "1-2 doses (intervalo 5 anos)",
              "observacao": "Complementa VPC conjugada"
            },
            "esquema_resumido": "1-2 doses",
            "diferencial_privada": "Ampla cobertura"
          },
          {
            "nome": "Herpes Zóster (Shingrix)",
            "protege_contra": "Herpes zóster (cobreiro)",
            "idade_aplicacao": {
              "indicacao": "≥50 anos (rotina), prioridade ≥60",
              "esquema": "2 doses (intervalo 2 meses)",
              "observacao": "Mesmo quem já teve zóster pode vacinar"
            },
            "esquema_resumido": "2 doses (intervalo 2m)",
            "diferencial_privada": "★ EXCLUSIVA REDE PRIVADA"
          },
          {
            "nome": "VSR (Arexvy ou Abrysvo)",
            "protege_contra": "Infecção respiratória grave por VSR",
            "idade_aplicacao": {
              "indicacao": "≥60 anos (rotina ≥70 ou 60-69 com comorbidades)",
              "esquema": "Dose única",
              "observacao": "Nova vacina 2024"
            },
            "esquema_resumido": "Dose única ≥60 anos",
            "diferencial_privada": "★ EXCLUSIVA REDE PRIVADA - NOVA"
          },
          {
            "nome": "dTpa",
            "protege_contra": "Difteria, Tétano, Coqueluche",
            "idade_aplicacao": {
              "indicacao": "Reforço a cada 10 anos",
              "observacao": "Especialmente avós em contato com netos RN"
            },
            "esquema_resumido": "Reforço a cada 10 anos",
            "diferencial_privada": "Proteção contra coqueluche"
          },
          {
            "nome": "Hepatite A e B",
            "protege_contra": "Hepatites A e B",
            "idade_aplicacao": {
              "indicacao": "Se não vacinado anteriormente",
              "observacao": "Especialmente viajantes"
            },
            "esquema_resumido": "Completar esquema se necessário",
            "diferencial_privada": "Combinada disponível"
          }
        ]
      },
      {
        "categoria": "VIAJANTES",
        "icone": "aviao",
        "cor_destaque": "#F39C12",
        "vacinas": [
          {
            "nome": "Febre Tifoide",
            "protege_contra": "Febre tifoide",
            "idade_aplicacao": {
              "indicacao": "Viajantes para áreas endêmicas",
              "idade_minima": "2 anos",
              "esquema": "Dose única",
              "validade": "Reforço a cada 3 anos se exposição mantida"
            },
            "esquema_resumido": "Dose única (≥2 anos)",
            "diferencial_privada": "★ EXCLUSIVA REDE PRIVADA"
          },
          {
            "nome": "Cólera (oral)",
            "protege_contra": "Cólera e diarreia do viajante (ETEC)",
            "idade_aplicacao": {
              "indicacao": "Viajantes para áreas de risco",
              "idade_minima": "2 anos",
              "esquema": "2 doses (intervalo 1-6 semanas)",
              "observacao": "Oral - sachê"
            },
            "esquema_resumido": "2 doses orais",
            "diferencial_privada": "★ EXCLUSIVA REDE PRIVADA"
          },
          {
            "nome": "Raiva (pré-exposição)",
            "protege_contra": "Raiva",
            "idade_aplicacao": {
              "indicacao": "Viajantes para áreas de risco, profissionais expostos",
              "esquema": "3 doses (0, 7, 21-28 dias)",
              "reforco": "Conforme sorologia ou exposição"
            },
            "esquema_resumido": "3 doses",
            "diferencial_privada": "Disponível para profilaxia"
          },
          {
            "nome": "Febre Amarela",
            "protege_contra": "Febre amarela",
            "idade_aplicacao": {
              "indicacao": "Viajantes para áreas endêmicas",
              "prazo": "Aplicar até 10 dias antes da viagem",
              "certificado": "CIVP válido para vida toda"
            },
            "esquema_resumido": "1-2 doses",
            "diferencial_privada": "Emissão de CIVP"
          },
          {
            "nome": "Meningocócica ACWY",
            "protege_contra": "Meningite meningocócica",
            "idade_aplicacao": {
              "indicacao": "Viajantes para cinturão da meningite (África), Hajj",
              "certificado": "Obrigatória para Arábia Saudita"
            },
            "esquema_resumido": "1 dose",
            "diferencial_privada": "Disponível"
          }
        ]
      }
    ]
  },
  "secao_diferenciais": {
    "titulo": "POR QUE INDICAR A SAÚDE LIVRE?",
    "subtitulo": "A maior rede de clínicas de vacinas do Brasil",
    "items": [
      {
        "icone": "certificado",
        "texto": "Calendário SBIm 2024/2025 completo"
      },
      {
        "icone": "coracao",
        "texto": "Atendimento humanizado e técnicas de alívio da dor"
      },
      {
        "icone": "crianca",
        "texto": "Ambiente acolhedor e lúdico para crianças"
      },
      {
        "icone": "equipe",
        "texto": "Equipe especializada liderada pela Enf. Sophia"
      },
      {
        "icone": "whatsapp",
        "texto": "Agendamento fácil via WhatsApp"
      },
      {
        "icone": "relogio",
        "texto": "Segunda a Sexta: 08h às 18h"
      }
    ]
  },
  "secao_contato": {
    "clinica": "Saúde Livre Vacinas",
    "unidade": "Florianópolis Centro",
    "slogan": "Prevenção é um ato de amor",
    "descricao": "A maior rede de clínicas de vacinas do Brasil",
    "endereco": "Alameda Gov. Heriberto Hulse, 123",
    "bairro": "Centro",
    "cidade": "Florianópolis - SC",
    "telefone": "(48) 99189-5758",
    "whatsapp": "5548991895758",
    "whatsapp_link": "https://wa.me/5548991895758",
    "email": "contato@saudelivrefloripa.com.br",
    "site": "saudelivrefloripa.com.br",
    "horario_funcionamento": "Segunda a Sexta: 08:00 - 18:00",
    "equipe_destaque": "Equipe liderada pela Enf. Sophia, focada em atendimento humanizado e técnicas de alívio da dor",
    "ambiente": "Ambiente acolhedor e lúdico para crianças",
    "qr_code_placeholder": true,
    "qr_code_destino": "WhatsApp para agendamento"
  },
  "tabela_resumo_idades": {
    "titulo": "RESUMO - IDADES CHAVE",
    "idades": [
      {
        "idade": "Ao nascer",
        "vacinas": ["BCG", "Hepatite B (1ª dose)"]
      },
      {
        "idade": "2 meses",
        "vacinas": ["Hexa/Penta (1ª)", "Pneumo (1ª)", "Rotavírus (1ª)"]
      },
      {
        "idade": "3 meses",
        "vacinas": ["MenACWY (1ª)", "MenB (1ª)"]
      },
      {
        "idade": "4 meses",
        "vacinas": ["Hexa/Penta (2ª)", "Pneumo (2ª)", "Rotavírus (2ª)"]
      },
      {
        "idade": "5 meses",
        "vacinas": ["MenACWY (2ª)", "MenB (2ª)"]
      },
      {
        "idade": "6 meses",
        "vacinas": ["Hexa/Penta (3ª)", "Rotavírus (3ª)", "Influenza (início)"]
      },
      {
        "idade": "9 meses",
        "vacinas": ["Febre Amarela (1ª)"]
      },
      {
        "idade": "12 meses",
        "vacinas": ["Tríplice Viral (1ª)", "Hepatite A (1ª)", "Varicela (1ª)", "Pneumo (reforço)", "MenACWY (reforço)", "MenB (reforço)"]
      },
      {
        "idade": "15 meses",
        "vacinas": ["Tetraviral ou SCR+V (2ª)", "DTPa/Penta (reforço)"]
      },
      {
        "idade": "18 meses",
        "vacinas": ["Hepatite A (2ª)"]
      },
      {
        "idade": "4 anos",
        "vacinas": ["DTPa (2º reforço)", "Varicela (2ª)", "Febre Amarela (2ª)", "Dengue (início possível)"]
      },
      {
        "idade": "9 anos",
        "vacinas": ["HPV (início ideal)"]
      },
      {
        "idade": "11 anos",
        "vacinas": ["MenACWY (reforço adolescente)", "dTpa (reforço)"]
      },
      {
        "idade": "Gestantes",
        "vacinas": ["dTpa (cada gestação)", "Influenza", "VSR-Abrysvo (32-36 sem)"]
      },
      {
        "idade": "≥50 anos",
        "vacinas": ["Herpes Zóster (Shingrix)"]
      },
      {
        "idade": "≥60 anos",
        "vacinas": ["Influenza HD", "Pneumocócicas", "VSR", "Herpes Zóster"]
      }
    ]
  },
  "comparativo_sus_vs_privada": {
    "titulo": "VANTAGENS DA REDE PRIVADA",
    "tabela_resumo": [
      {
        "vacina": "Rotavírus",
        "sus": "Monovalente (1 sorotipo)",
        "privada": "Pentavalente (5 sorotipos)"
      },
      {
        "vacina": "Pneumocócica",
        "sus": "VPC10 (10 sorotipos)",
        "privada": "VPC13/15/20 (13-20 sorotipos)"
      },
      {
        "vacina": "Meningocócica",
        "sus": "MenC apenas",
        "privada": "MenACWY + MenB"
      },
      {
        "vacina": "DTP",
        "sus": "Células inteiras (mais reatogênica)",
        "privada": "Acelular (menos reações)"
      },
      {
        "vacina": "HPV",
        "sus": "HPV4 dose única",
        "privada": "HPV9 (2-3 doses, 9 tipos)"
      },
      {
        "vacina": "Influenza",
        "sus": "Trivalente",
        "privada": "Tetravalente + HD para idosos"
      },
      {
        "vacina": "Hepatite A",
        "sus": "1 dose apenas",
        "privada": "2 doses (proteção completa)"
      },
      {
        "vacina": "Dengue",
        "sus": "Apenas 10-14 anos",
        "privada": "4-60 anos"
      }
    ]
  },
  "vacinas_exclusivas_rede_privada": [
    "Hexavalente Acelular",
    "Meningocócica B",
    "Herpes Zóster Recombinante (Shingrix)",
    "VSR para Idosos (Arexvy/Abrysvo)",
    "VSR para Gestantes (Abrysvo)",
    "dTpa-VIP",
    "Hepatite A+B Combinada",
    "Febre Tifoide",
    "Cólera",
    "Influenza HD (alta dose para idosos)",
    "HPV 9-valente"
  ],
  "instrucoes_design": {
    "hierarquia_visual": [
      "1. Logo e nome da clínica (destaque máximo)",
      "2. Vacinas EXCLUSIVAS da rede privada (badges coloridos)",
      "3. Idades de aplicação em destaque (negrito ou cor diferente)",
      "4. Vacinas com PROTEÇÃO AMPLIADA vs SUS",
      "5. Demais vacinas do calendário completo",
      "6. Tabela resumo de idades chave",
      "7. Diferenciais e contato"
    ],
    "dicas_layout": [
      "Usar ícones pequenos ao lado de cada vacina para facilitar identificação",
      "IDADE em destaque (negrito ou caixa colorida) para cada vacina",
      "Agrupar por faixa etária com separadores visuais claros",
      "Destacar com badges coloridos as vacinas exclusivas",
      "Incluir mini-calendário visual com idades-chave",
      "QR Code no canto inferior direito para agendamento rápido",
      "Usar fonte legível mesmo em tamanho 7pt",
      "Considerar folder frente e verso se necessário mais espaço"
    ],
    "sugestao_frente_verso": {
      "frente": {
        "conteudo": [
          "Header com logo",
          "Vacinas pediátricas 0-10 anos COM IDADES",
          "Proteção especial lactentes (Nirsevimabe)",
          "Contato e QR Code"
        ]
      },
      "verso": {
        "conteudo": [
          "Adolescentes",
          "Gestantes",
          "Adultos e Idosos",
          "Viajantes",
          "Tabela comparativa SUS vs Privada",
          "Diferenciais da clínica"
        ]
      }
    }
  },
  "mensagem_final_pediatras": {
    "texto": "A Saúde Livre Florianópolis Centro trabalha em parceria com você para garantir a proteção integral dos seus pacientes. Encaminhamentos são bem-vindos!",
    "destaque": "Calendário completo SBIm | Todas as idades | Cuidado humanizado"
  },
  "metadados": {
    "versao": "3.0",
    "data_criacao": "2025-01-13",
    "atualizacao": "Informações da Saúde Livre Florianópolis Centro + idades de aplicação",
    "referencia_calendario": "SBIm 2024/2025",
    "clinica": "Saúde Livre Vacinas - Unidade Florianópolis Centro",
    "publico_alvo": "Médicos Pediatras e demais especialidades",
    "formato_saida": "Folder A5 frente e verso recomendado",
    "sugestao_impressao": "Papel couché 150g ou offset 120g"
  }
}