import { SkillPlain } from "@/types/skill";
import { Box, Button, Chip, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import Select from 'react-select';
import CloseIcon from '@mui/icons-material/Close';

type CareerOption = {
  value: string;
  label: string;
}

const careerOptions: CareerOption[] = [
  { value: 'sd', label: 'Software Development' },
  { value: 'ds', label: 'Data Science' },
  { value: 'de', label: 'Data Engineer' },
  { value: 'wd', label: 'Web Development' },
  { value: 'md', label: 'Mobile Development' },
  { value: 'doe', label: 'DevOps Engineering' },
  { value: 'uiux', label: 'UI/UX Design' },
  { value: 'pm', label: 'Project Management' },
  { value: 'qa', label: 'Quality Assurance' },
  { value: 'sa', label: 'System Administration' },
  { value: 'ne', label: 'Network Engineering' }
]

// const mockExistingSkills = ['JAVA', 'PHP', 'JavaScript', 'Python', 'C++', 'Ruby', 'Swift'];
// const mockExistingSkillsFm: string[] = [];
type UserSkillProps = {
  skill: SkillPlain[];
};
const CreateSkillForm: React.FC<UserSkillProps> = ({ skill }) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted")
  }

  const [careerType, setCareerType] = useState<CareerOption | null>(careerOptions[0]);
  // const [languague, setLanguague] = useState<string[]>([]);
  // const [framework, setFramework] = useState<string[]>([]);
  // const [cloudDB, setCloudDB] = useState<string[]>([]);
  // const [tool, setTool] = useState<string[]>([]);
  // const [other, setOther] = useState<string[]>([]);

  const [skills, setSkills] = useState({
    language: [] as string[],
    framework: [] as string[],
    cloudDB: [] as string[],
    tool: [] as string[],
    other: [] as string[],
  });

  const [newSkillInput, setNewSkillInput] = useState({
    language: '',
    framework: '',
    cloudDB: '',
    tool: '',
    other: '',
  });

  const handleAddSkill = (category: keyof typeof skills) => {
    const trimmed = newSkillInput[category].trim(); // remove spaces ex. " Aws" --> "Aws"

    if (trimmed && !skills[category].includes(trimmed)) { // check if the skill is not empty and not already in the list
      setSkills((prev) => ({
        ...prev,
        [category]: [...prev[category], trimmed],
      }));

      setNewSkillInput(prev => ({
        ...prev,
        [category]: '',
      }));

    }
  }

  const handleRemoveSkill = (category: keyof typeof skills, value: string) => {
    setSkills(prev => ({
      ...prev,
      [category]: prev[category].filter(skill => skill !== value)
    }))
  }

  useEffect(() => {
    if (careerType) {
      const filtered = skill.find(
        s => s.abbreviation === careerType.value
      )
      if (filtered) {
        setSkills({
          language: filtered.Languague || [],
          framework: filtered.Framework || [],
          cloudDB: filtered.CloudDB || [],
          tool: filtered.Tool || [],
          other: filtered.Other || [],
        })
      } else {
        setSkills({
          language: [],
          framework: [],
          cloudDB: [],
          tool: [],
          other: [],
        });
      }
    }
    // console.log("Selected Career Type:", careerType);
    // console.log(`Skill list from props:`, skill);
    // console.log(`Filtered Skills based on Career Type:`, filteredSkills);
    // const filteredSkills = careerType ? skill.find((s) => s.abbreviation === careerType.value) : undefined;
    // setLanguague(filteredSkills?.Languague || []);
    // setFramework(filteredSkills?.Framework || []);
    // setCloudDB(filteredSkills?.CloudDB || []);
    // setTool(filteredSkills?.Tool || []);
    // setOther(filteredSkills?.Other || []);
  }, [careerType, skill]);

  return (
    <>
      <div className="my-4">
        <p className='text-zinc-800 font-bold me-2'>Add or Update Skill</p>
      </div>
      <div>
        <Box component="form" onSubmit={handleSubmit} sx={{
          // '& .MuiTextField-root': { mb: 2 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',

        }}>
          <div className='flex items-center mb-5'>
            <p className='text-zinc-800 me-2'>Career Type:</p>
            <Select
              className="w-80"
              options={careerOptions}
              value={careerType}
              onChange={setCareerType}
              placeholder="Select Career Type"
              isClearable
              menuPortalTarget={typeof window !== 'undefined' ? document.body : undefined}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }} />
          </div>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

            <Box
              component="div"
              className="relative border border-zinc-300 rounded-xl p-6 pt-8"
            >
              <Typography
                variant="caption"
                component="div"
                className="absolute left-6 -top-[10px] bg-white px-2 text-zinc-600 font-medium"
              >
                Language Programming
              </Typography>

              <div className="flex flex-col h-full">
                <div className="flex-grow overflow-y-auto">
                  <Typography variant="subtitle2" className="text-zinc-800">
                    Current Skills:
                  </Typography>
                  <Box className="flex flex-wrap gap-2 mt-2">
                    {skills.language && skills.language.length > 0 ? (
                      skills.language.map((lang) => (
                        <Chip
                          key={lang}
                          label={lang}
                          variant="outlined"
                          size="small"
                          onDelete={() => handleRemoveSkill('language', lang)}
                          onClick={() => { }} // แก้ warning
                          deleteIcon={<CloseIcon fontSize="small" />}
                          sx={{
                            borderColor: 'rgb(161 161 170)',
                            color: 'rgb(63 63 70)',
                            '& .MuiChip-deleteIcon': {
                              color: 'rgb(113 113 122)',
                              transition: 'color 0.2s ease',
                              '&:hover': {
                                color: '#dc2626',
                              },
                            },
                          }}
                          className="border-zinc-400 text-zinc-700 hover:bg-zinc-100"
                        />
                      ))
                    ) : (
                      <Typography variant="body2" className="text-zinc-500">
                        No programming languages listed yet.
                      </Typography>
                    )}
                  </Box>
                </div>
                <div className="mt-3">
                  <Typography variant="subtitle2" className="mb-2 text-zinc-800">
                    Add New Language:
                  </Typography>
                  <Box
                    // onSubmit={handleAddNewLanguage} // Uncomment to enable form submission
                    className="flex items-center gap-2"
                  >
                    <TextField
                      value={newSkillInput.language}
                      onChange={(e) =>
                        setNewSkillInput({ ...newSkillInput, language: e.target.value })
                      }

                      label="E.g., Go, Rust, Kotlin"
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgb(212 212 216)', // zinc-300
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgb(161 161 170)', // zinc-400
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'rgb(59 130 246)', // blue-500
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgb(113 113 122)', // zinc-500
                          '&.Mui-focused': {
                            color: 'rgb(59 130 246)', // blue-500
                          }
                        },
                      }}
                    />
                    <Button
                      onClick={() => handleAddSkill('language')}
                      type="button"
                      variant="contained"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Add
                    </Button>
                  </Box>
                </div>
              </div>
            </Box>
            <Box
              component="div"
              className="relative border border-zinc-300 rounded-xl p-6 pt-8"
            >
              <Typography
                variant="caption"
                component="div"
                className="absolute left-6 -top-[10px] bg-white px-2 text-zinc-600 font-medium"
              >
                Framework & Library
              </Typography>
              <div className="flex flex-col h-full">
                <div className="flex-grow overflow-y-auto">
                  <Typography variant="subtitle2" className="mb-3 text-zinc-800">
                    Current Skills:
                  </Typography>
                  <Box className="flex flex-wrap gap-2 mt-2">
                    {skills.framework && skills.framework.length > 0 ? (
                      skills.framework.map((frame) => (
                        <Chip
                          key={frame}
                          label={frame}
                          variant="outlined"
                          size="small"
                          onDelete={() => handleRemoveSkill('framework', frame)}
                          onClick={() => { }} // แก้ warning
                          deleteIcon={<CloseIcon fontSize="small" />}
                          sx={{
                            borderColor: 'rgb(161 161 170)',
                            color: 'rgb(63 63 70)',
                            '& .MuiChip-deleteIcon': {
                              color: 'rgb(113 113 122)',
                              transition: 'color 0.2s ease',
                              '&:hover': {
                                color: '#dc2626',
                              },
                            },
                          }}
                          className="border-zinc-400 text-zinc-700 hover:bg-zinc-100"
                        />
                      ))
                    ) : (
                      <Typography variant="body2" className="text-zinc-500">
                        No framework & library listed yet.
                      </Typography>
                    )}
                  </Box>
                </div>
                <div className="mt-3">
                  <Typography variant="subtitle2" className="mb-2 text-zinc-800">
                    Add New Framework or Library:
                  </Typography>
                  <Box
                    className="flex items-center gap-2"
                  >
                    <TextField
                      value={newSkillInput.framework}
                      onChange={(e) =>
                        setNewSkillInput({ ...newSkillInput, framework: e.target.value })
                      }
                      label="E.g., React, Vue, Django"
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgb(212 212 216)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgb(161 161 170)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'rgb(59 130 246)',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgb(113 113 122)',
                          '&.Mui-focused': {
                            color: 'rgb(59 130 246)',
                          }
                        },
                      }}
                    />
                    <Button
                      onClick={() => handleAddSkill('framework')}
                      type="button"
                      variant="contained"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Add
                    </Button>
                  </Box>
                </div>
              </div>
            </Box>
            <Box
              component="div"
              className="relative border border-zinc-300 rounded-xl p-6 pt-8"
            >
              <Typography
                variant="caption"
                component="div"
                className="absolute left-6 -top-[10px] bg-white px-2 text-zinc-600 font-medium"
              >
                Cloud & Database
              </Typography>

              <div className="flex flex-col h-full">
                <div className="flex-grow overflow-y-auto">
                  <Typography variant="subtitle2" className="text-zinc-800">
                    Current Skills:
                  </Typography>
                  <Box className="flex flex-wrap gap-2 mt-2">
                    {skills.cloudDB && skills.cloudDB.length > 0 ? (
                      skills.cloudDB.map((cd) => (
                        <Chip
                          key={cd}
                          label={cd}
                          variant="outlined"
                          size="small"
                          onDelete={() => handleRemoveSkill('cloudDB', cd)}
                          onClick={() => { }} // แก้ warning
                          deleteIcon={<CloseIcon fontSize="small" />}
                          sx={{
                            borderColor: 'rgb(161 161 170)',
                            color: 'rgb(63 63 70)',
                            '& .MuiChip-deleteIcon': {
                              color: 'rgb(113 113 122)',
                              transition: 'color 0.2s ease',
                              '&:hover': {
                                color: '#dc2626',
                              },
                            },
                          }}
                          className="border-zinc-400 text-zinc-700 hover:bg-zinc-100"
                        />
                      ))
                    ) : (
                      <Typography variant="body2" className="text-zinc-500">
                        No cloud and database listed yet.
                      </Typography>
                    )}
                  </Box>
                </div>
                <div className="mt-3">
                  <Typography variant="subtitle2" className="mb-2 text-zinc-800">
                    Add New Cloud or DB:
                  </Typography>
                  <Box
                    className="flex items-center gap-2"
                  >
                    <TextField
                      value={newSkillInput.cloudDB}
                      onChange={(e) =>
                        setNewSkillInput({ ...newSkillInput, cloudDB: e.target.value })
                      }
                      label="E.g., AWS, MongoDB, Firebase"
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgb(212 212 216)', // zinc-300
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgb(161 161 170)', // zinc-400
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'rgb(59 130 246)', // blue-500
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgb(113 113 122)', // zinc-500
                          '&.Mui-focused': {
                            color: 'rgb(59 130 246)', // blue-500
                          }
                        },
                      }}
                    />
                    <Button
                      onClick={() => handleAddSkill('cloudDB')}
                      type="button"
                      variant="contained"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Add
                    </Button>
                  </Box>
                </div>
              </div>
            </Box>
            <Box
              component="div"
              className="relative border border-zinc-300 rounded-xl p-6 pt-8"
            >
              <Typography
                variant="caption"
                component="div"
                className="absolute left-6 -top-[10px] bg-white px-2 text-zinc-600 font-medium"
              >
                Tools
              </Typography>

              <div className="flex flex-col h-full">
                <div className="flex-grow overflow-y-auto">
                  <Typography variant="subtitle2" className="text-zinc-800">
                    Current Skills:
                  </Typography>
                  <Box className="flex flex-wrap gap-2 mt-2">
                    {skills.tool && skills.tool.length > 0 ? (
                      skills.tool.map((t) => (
                        <Chip
                          key={t}
                          label={t}
                          variant="outlined"
                          size="small"
                          onDelete={() => handleRemoveSkill('tool', t)}
                          onClick={() => { }} // แก้ warning
                          deleteIcon={<CloseIcon fontSize="small" />}
                          sx={{
                            borderColor: 'rgb(161 161 170)',
                            color: 'rgb(63 63 70)',
                            '& .MuiChip-deleteIcon': {
                              color: 'rgb(113 113 122)',
                              transition: 'color 0.2s ease',
                              '&:hover': {
                                color: '#dc2626',
                              },
                            },
                          }}
                          className="border-zinc-400 text-zinc-700 hover:bg-zinc-100"
                        />
                      ))
                    ) : (
                      <Typography variant="body2" className="text-zinc-500">
                        No tool listed yet.
                      </Typography>
                    )}
                  </Box>
                </div>
                <div className="mt-3">
                  <Typography variant="subtitle2" className="mb-2 text-zinc-800">
                    Add New Tool:
                  </Typography>
                  <Box
                    className="flex items-center gap-2"
                  >
                    <TextField
                      value={newSkillInput.tool}
                      onChange={(e) =>
                        setNewSkillInput({ ...newSkillInput, tool: e.target.value })
                      }
                      label="E.g., Docker, Git, VSCode"
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgb(212 212 216)', // zinc-300
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgb(161 161 170)', // zinc-400
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'rgb(59 130 246)', // blue-500
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgb(113 113 122)', // zinc-500
                          '&.Mui-focused': {
                            color: 'rgb(59 130 246)', // blue-500
                          }
                        },
                      }}
                    />
                    <Button
                      onClick={() => handleAddSkill('tool')}
                      type="button"
                      variant="contained"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Add
                    </Button>
                  </Box>
                </div>
              </div>
            </Box>
            <Box
              component="div"
              className="relative border border-zinc-300 rounded-xl p-6 pt-8"
            >
              <Typography
                variant="caption"
                component="div"
                className="absolute left-6 -top-[10px] bg-white px-2 text-zinc-600 font-medium"
              >
                Othor
              </Typography>

              <div className="flex flex-col h-full">
                <div className="flex-grow overflow-y-auto">
                  <Typography variant="subtitle2" className="text-zinc-800">
                    Current Skills:
                  </Typography>
                  <Box className="flex flex-wrap gap-2 mt-2">
                    {skills.other && skills.other.length > 0 ? (
                      skills.other.map((o) => (
                        <Chip
                          key={o}
                          label={o}
                          variant="outlined"
                          size="small"
                          onDelete={() => handleRemoveSkill('tool', o)}
                          onClick={() => { }} // แก้ warning
                          deleteIcon={<CloseIcon fontSize="small" />}
                          sx={{
                            borderColor: 'rgb(161 161 170)',
                            color: 'rgb(63 63 70)',
                            '& .MuiChip-deleteIcon': {
                              color: 'rgb(113 113 122)',
                              transition: 'color 0.2s ease',
                              '&:hover': {
                                color: '#dc2626',
                              },
                            },
                          }}
                          className="border-zinc-400 text-zinc-700 hover:bg-zinc-100"
                        />
                      ))
                    ) : (
                      <Typography variant="body2" className="text-zinc-500">
                        No listed yet.
                      </Typography>
                    )}
                  </Box>
                </div>
                <div className="mt-3">
                  <Typography variant="subtitle2" className="mb-2 text-zinc-800">
                    Add New:
                  </Typography>
                  <Box
                    className="flex items-center gap-2"
                  >
                    <TextField
                      value={newSkillInput.other}
                      onChange={(e) =>
                        setNewSkillInput({ ...newSkillInput, other: e.target.value })
                      }
                      label="E.g., Agile, Scrum"
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgb(212 212 216)', // zinc-300
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgb(161 161 170)', // zinc-400
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'rgb(59 130 246)', // blue-500
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgb(113 113 122)', // zinc-500
                          '&.Mui-focused': {
                            color: 'rgb(59 130 246)', // blue-500
                          }
                        },
                      }}
                    />
                    <Button
                      onClick={() => handleAddSkill('other')}
                      type="button"
                      variant="contained"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Add
                    </Button>
                  </Box>
                </div>
              </div>
            </Box>
          </Box>
          <Button
            type="submit"
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save
          </Button>
        </Box>
      </div>
    </>
  )
}
export default CreateSkillForm