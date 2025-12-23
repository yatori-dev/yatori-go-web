"use client"

import {useState} from "react"
import {AccountCard} from "@/components/account-card"
import {AccountDetail} from "@/components/account-detail"
import {Button} from "@/components/ui/button"
import {Plus} from "lucide-react"
import {AddAccountDialog} from "@/components/add-account-dialog"

export type Account = {
    id: string
    platform: string
    account: string
    password: string
    status: "active" | "inactive"
    courseCount: number
    lastLogin?: string
}

export type Course = {
    id: string
    title: string
    progress: number
    totalLessons: number
    completedLessons: number
    instructor: string
    category: string
}

const initialAccounts: Account[] = [
    {
        id: "1",
        platform: "XUEXITONG",
        account: "zhangsan2024",
        password: "Pass@123456",
        status: "active",
        courseCount: 5,
        lastLogin: "2025-01-15 14:30",
    },
    {
        id: "2",
        platform: "XUEXITONG",
        account: "lisi2024",
        password: "SecurePass999",
        status: "active",
        courseCount: 3,
        lastLogin: "2025-01-14 09:15",
    },
]

const coursesData: Record<string, Course[]> = {
    "1": [
        {
            id: "c1",
            title: "高等数学",
            progress: 75,
            totalLessons: 48,
            completedLessons: 36,
            instructor: "王教授",
            category: "数学",
        },
        {
            id: "c2",
            title: "计算机网络",
            progress: 60,
            totalLessons: 40,
            completedLessons: 24,
            instructor: "李老师",
            category: "计算机",
        },
        {
            id: "c3",
            title: "数据结构",
            progress: 85,
            totalLessons: 45,
            completedLessons: 38,
            instructor: "赵老师",
            category: "计算机",
        },
        {
            id: "c4",
            title: "线性代数",
            progress: 45,
            totalLessons: 36,
            completedLessons: 16,
            instructor: "刘教授",
            category: "数学",
        },
        {
            id: "c5",
            title: "操作系统",
            progress: 30,
            totalLessons: 42,
            completedLessons: 13,
            instructor: "陈老师",
            category: "计算机",
        },
    ],
    "2": [
        {
            id: "c6",
            title: "英语听力",
            progress: 90,
            totalLessons: 30,
            completedLessons: 27,
            instructor: "Smith",
            category: "语言",
        },
        {
            id: "c7",
            title: "大学物理",
            progress: 55,
            totalLessons: 50,
            completedLessons: 28,
            instructor: "张教授",
            category: "物理",
        },
        {
            id: "c8",
            title: "Python编程",
            progress: 70,
            totalLessons: 35,
            completedLessons: 25,
            instructor: "周老师",
            category: "编程",
        },
    ],
}

export function AccountList() {
    const [accounts, setAccounts] = useState<Account[]>(initialAccounts)
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

    const handleAccountClick = (account: Account) => {
        setSelectedAccount(account)
    }

    const handleBack = () => {
        setSelectedAccount(null)
    }

    const handleDeleteAccount = (id: string) => {
        setAccounts(accounts.filter((acc) => acc.id !== id))
        if (selectedAccount?.id === id) {
            setSelectedAccount(null)
        }
    }

    const handleAddAccount = (account: Omit<Account, "id">) => {
        const newAccount = {
            ...account,
            id: Date.now().toString(),
        }
        setAccounts([...accounts, newAccount])
    }

    if (selectedAccount) {
        return (
            <AccountDetail account={selectedAccount} courses={coursesData[selectedAccount.id] || []}
                           onBack={handleBack}/>
        )
    }

    return (
        <div>
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">账号管理</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">管理和查看所有学习账号</p>
                </div>
                <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2 w-full sm:w-auto">
                    <Plus className="h-4 w-4"/>
                    添加账号
                </Button>
            </div>

            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {accounts.map((account) => (
                    <AccountCard
                        key={account.id}
                        account={account}
                        onClick={() => handleAccountClick(account)}
                        onDelete={() => handleDeleteAccount(account.id)}
                    />
                ))}
            </div>

            {accounts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4">
                    <div className="rounded-full bg-muted p-4 mb-4">
                        <Plus className="h-8 w-8 text-muted-foreground"/>
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-foreground mb-2">暂无账号</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">点击上方按钮添加第一个账号</p>
                </div>
            )}

            <AddAccountDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAdd={handleAddAccount}/>
        </div>
    )
}
