#include <iostream>
using namespace std;

int main(){
    int n;
    cout<<"Enter no. of subjects:"<<endl;
    cin>>n;
    string name;
    cout<<"Enter your name\n";
    cin>>name;
    int sum=0,credSum=0;
    for(int i=1;i<=n;i++){
        int marks,credit;
        cout<<"Enter marks and credits for subject "<<i<<":"<<endl;
        cin>>marks>>credit;
        credSum+=credit;
        int ob=0;
        if(marks>=90){
            ob=10;
        }else if(marks>=80){
            ob=9;
        }else if(marks>=70){
            ob=8;
        }else if(marks>=60){
            ob=7;
        }else if(marks>=50){
            ob=6;
        }else if(marks>=40){
            ob=5;
        }
        sum+=(ob*credit);
    }
    double s=sum;
    double c=credSum;
    cout<<name<<" TGPA is :"<<(s/c);
}